import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import Navbar from './components/Navbar';
import MobileMenu from './components/MobileMenu';
import AlertBadge from './components/AlertBadge';
import HomeSection from './components/HomeSection';
import NGORegisterSection from './components/NGORegisterSection';
import DashboardSection from './components/DashboardSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DirectionsModal from './components/DirectionsModal';
import './styles/App.css';

// Initialize SocketIO client
const socket = io('http://localhost:5000/', {
    path: '/socket.io',
    transports: ['websocket'],
    withCredentials: true
});




const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [location, setLocation] = useState(null);
    const [locationText, setLocationText] = useState('');
    const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
    const [userFormVisible, setUserFormVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [sirenAudio, setSirenAudio] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ngoData, setNgoData] = useState(null);
    const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);
    const [rescueStatus, setRescueStatus] = useState(['active', 'active', 'pending', 'pending']);
    const [isValidAnimal, setIsValidAnimal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        checkNGOLogin();
        window.socket = socket;
    
        // Only register listener if NGO is logged in
        if (isLoggedIn && ngoData) {
            // Join the special NGO socket room
            socket.emit('join_ngo', { ngo_id: ngoData.id });
            console.log('📢 NGO joined room via socket');
    
            // Listen for NGO-only report events
            socket.on('new_report', (data) => {
                console.log('🔥 NGO Dashboard received event:', data);
                if (data.message && data.message.includes('Animal detected')) {
                    Swal.fire({
                        title: 'New Animal Report!',
                        text: data.message || 'A new animal rescue report has been submitted.',
                        icon: 'info',
                        confirmButtonColor: '#FF6B6B'
                    });
                    setIsAlertVisible(true);
                }
            });
    
            // Cleanup on logout/unmount
            return () => {
                socket.off('new_report');
            };
        }
    }, [isLoggedIn, ngoData]);
    
    const showPage = (pageId) => {
        setCurrentPage(pageId);
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    };

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire({
                    title: 'File Too Large',
                    text: 'Please upload an image smaller than 5MB.',
                    icon: 'error',
                    confirmButtonColor: '#FF6B6B'
                });
                return;
            }
    
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setIsAnalyzingImage(true);
    
                const img = new Image();
                img.src = e.target.result;
                img.onload = async () => {
                    const isValidDimensions = img.width >= 300 && img.height >= 300 && img.width <= 4000 && img.height <= 4000;
                    if (!isValidDimensions) {
                        setIsAnalyzingImage(false);
                        Swal.fire({
                            title: 'Invalid Dimensions',
                            text: 'Please upload an image between 300x300 and 4000x4000 pixels.',
                            icon: 'error',
                            confirmButtonColor: '#FF6B6B'
                        });
                        setImagePreview('');
                        setSelectedFile(null);
                        return;
                    }
    
                    const formData = new FormData();
                    formData.append('image', file);
    
                    const maxRetries = 3;
                    let attempt = 0;
    
                    while (attempt < maxRetries) {
                        try {
                            const controller = new AbortController();
                            const timeoutId = setTimeout(() => controller.abort(), 15000);
    
                            const response = await fetch('http://localhost:5000/api/report', {
                                method: 'POST',
                                body: formData,
                                signal: controller.signal,
                                headers: {
                                    'Accept': 'application/json'
                                }
                            });
    
                            clearTimeout(timeoutId);
    
                            const responseText = await response.text();
                            console.log('💡 Raw API Response:', responseText);
    
                            let result;
                            try {
                                result = JSON.parse(responseText);
                            } catch (err) {
                                throw new Error(`Failed to parse JSON response: ${err.message}`);
                            }
    
                            if (!response.ok) {
                                throw new Error(`HTTP error ${response.status}: ${result.error || responseText}`);
                            }
    
                            // ✅ Final response checks
                            setIsAnalyzingImage(false);
                            if (!result.class || typeof result.confidence !== 'number' || !result.message) {
                                throw new Error('Invalid response format: missing class, confidence, or message');
                            }
    
                            if (result.class === 'Animal' && result.confidence >= 0.9) {
                                setIsValidAnimal(true);
                                setIsLoadingLocation(true);
    
                                if ("geolocation" in navigator) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            setIsLoadingLocation(false);
                                            const { latitude, longitude } = position.coords;
                                            setLocation({ latitude, longitude });
                                            setLocationText(`Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`);
    
                                            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                                                .then(res => res.json())
                                                .then(data => {
                                                    if (data && data.display_name) {
                                                        setLocationText(`<strong>Address:</strong> ${data.display_name}`);
                                                    }
                                                })
                                                .catch(error => console.error("Error getting address: ", error));
    
                                            setUserFormVisible(true);
                                        },
                                        (error) => {
                                            setIsLoadingLocation(false);
                                            setLocationText(`Error getting location: ${error.message}`);
                                            setUserFormVisible(true);
                                        }
                                    );
                                } else {
                                    setIsLoadingLocation(false);
                                    setLocationText("Geolocation is not supported by your browser.");
                                    setUserFormVisible(true);
                                }
                            } else {
                                setIsValidAnimal(false);
                                setImagePreview('');
                                setSelectedFile(null);
                                Swal.fire({
                                    title: 'Not an Animal Image',
                                    text: result.message || 'Could not detect an animal in this image.',
                                    icon: 'warning',
                                    confirmButtonColor: '#FF6B6B'
                                });
                            }
                            return; // exit on success
                        } catch (error) {
                            attempt++;
                            console.error(`❌ Attempt ${attempt} failed:`, error);
                            if (attempt === maxRetries) {
                                setIsValidAnimal(false);
                                setIsAnalyzingImage(false);
                                setImagePreview('');
                                setSelectedFile(null);
    
                                let errorMessage = 'An error occurred while analyzing the image. Please try again.';
                                if (error.name === 'AbortError') {
                                    errorMessage = 'Request timed out. Please try again.';
                                } else if (error.message.includes('Failed to fetch')) {
                                    errorMessage = 'Cannot connect to the backend. Is it running at http://localhost:5000? CORS or firewall issues may be preventing the request.';
                                } else if (error.message.includes('HTTP error')) {
                                    errorMessage = `Backend returned an error: ${error.message}`;
                                } else if (error.message.includes('parse JSON')) {
                                    errorMessage = `Invalid response from backend: ${error.message}`;
                                }
    
                                Swal.fire({
                                    title: 'Error',
                                    text: errorMessage,
                                    icon: 'error',
                                    confirmButtonColor: '#FF6B6B'
                                });
                            }
                            await new Promise(res => setTimeout(res, 1000));
                        }
                    }
                };
    
                img.onerror = () => {
                    setIsValidAnimal(false);
                    setIsAnalyzingImage(false);
                    Swal.fire({
                        title: 'Invalid Image',
                        text: 'The uploaded file could not be read or is corrupted.',
                        icon: 'error',
                        confirmButtonColor: '#FF6B6B'
                    });
                    setImagePreview('');
                    setSelectedFile(null);
                };
            };
            reader.readAsDataURL(file);
        } else {
            Swal.fire({
                title: 'Invalid File',
                text: 'Please upload a valid image file (JPG, PNG).',
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
        }
    };
    


    const playSiren = () => {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869.wav');
        audio.loop = true;
        audio.volume = 0.7;
        setSirenAudio(audio);

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                Swal.fire({
                    title: 'Sound Notification',
                    text: 'Your browser blocked the emergency siren sound. Click OK to enable it.',
                    icon: 'info',
                    confirmButtonText: 'Enable Sound',
                    confirmButtonColor: '#FF6B6B'
                }).then(() => {
                    const newAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869.wav');
                    newAudio.loop = true;
                    newAudio.volume = 0.7;
                    setSirenAudio(newAudio);
                    newAudio.play().catch(err => console.log("Sound still couldn't play:", err));
                });
            });
        }
    };

    const stopSiren = () => {
        if (sirenAudio) {
            sirenAudio.pause();
            sirenAudio.currentTime = 0;
            setSirenAudio(null);
        }
    };

    const submitReport = async () => {
        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
    
        if (!name || !phone) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please provide your name and phone number',
                icon: 'warning',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }
    
        if (!isValidAnimal) {
            Swal.fire({
                title: 'Invalid Image',
                text: 'Please upload a valid animal image before submitting.',
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }
    
        if (!selectedFile) {
            Swal.fire({
                title: 'Missing Image',
                text: 'Please re-upload the image.',
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }
    
        Swal.fire({
            title: 'Submitting Report',
            text: 'Please wait while we alert nearby NGOs...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    
        // Prepare form data for backend
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('location', JSON.stringify(location || {}));
        formData.append('address', locationText.replace(/<strong>Address:<\/strong> /, '') || '');
    
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
    
            const response = await fetch('http://localhost:5000/api/report', {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });
    
            clearTimeout(timeoutId);
    
            const responseText = await response.text();
            console.log('SubmitReport raw API response:', responseText);
    
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                throw new Error(`Failed to parse JSON response: ${parseError.message}`);
            }
    
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}: ${result.error || responseText}`);
            }
    
            if (result.class === 'Animal' && result.confidence >= 0.9) {
                Swal.fire({
                    title: 'Report Submitted!',
                    text: result.message || 'Nearby NGOs have been notified about the injured animal.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#FF6B6B'
                });
    
                setIsAlertVisible(true);
                playSiren();
    
                const reportDetails = {
                    name,
                    phone,
                    location,
                    timestamp: new Date().toISOString(),
                    image: imagePreview,
                    status: 'pending'
                };
    
                localStorage.setItem('lastReport', JSON.stringify(reportDetails));
                setSelectedFile(null);
            } else {
                Swal.fire({
                    title: 'Submission Failed',
                    text: result.message || result.error || 'Failed to submit report. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#FF6B6B'
                });
            }
        } catch (error) {
            let errorMessage = 'An error occurred while submitting the report. Please try again.';
            if (error.name === 'AbortError') {
                errorMessage = 'Request timed out. Please try again or check server performance.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Cannot connect to the backend. Please ensure the server is running at http://localhost:5000 and check for firewall or CORS issues.';
            } else if (error.message.includes('HTTP error')) {
                errorMessage = `Backend error: ${error.message}`;
            } else if (error.message.includes('parse JSON')) {
                errorMessage = `Invalid response from backend: ${error.message}`;
            }
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
            console.error('Error submitting report:', error);
        }
    };

    const acceptEmergencyRequest = () => {
        stopSiren();
        setIsAlertVisible(false);

        Swal.fire({
            title: 'Request Accepted!',
            text: 'You are now responsible for this rescue. Opening navigation...',
            icon: 'success',
            confirmButtonText: 'Navigate Now',
            confirmButtonColor: '#FF6B6B'
        }).then(() => {
            setIsDirectionsModalOpen(true);

            Swal.fire({
                title: 'Great News!',
                text: 'An NGO has accepted your request and is on the way. You can now track their progress.',
                icon: 'success',
                confirmButtonText: 'Open Tracking',
                confirmButtonColor: '#FF6B6B',
                timer: 5000,
                timerProgressBar: true
            });
        });
    };

    const closeDirectionsModal = () => {
        setIsDirectionsModalOpen(false);
    };

    const updateRescueStatus = (status) => {
        const newStatus = [...rescueStatus];

        if (status === 'arrived') {
            newStatus[2] = 'active';
            Swal.fire({
                title: 'Status Updated',
                text: 'You have marked yourself as arrived at the location.',
                icon: 'success',
                confirmButtonColor: '#FF6B6B'
            });
        } else if (status === 'rescued') {
            newStatus[3] = 'active';
            Swal.fire({
                title: 'Animal Rescued!',
                text: 'Thank you for rescuing this animal. The reporter has been notified.',
                icon: 'success',
                confirmButtonColor: '#FF6B6B'
            }).then(() => {
                closeDirectionsModal();
            });
        }

        setRescueStatus(newStatus);
    };

    const registerNGO = () => {
        const name = document.getElementById('ngoName').value;
        const email = document.getElementById('ngoEmail').value;
        const password = document.getElementById('ngoPassword').value;
        const phone = document.getElementById('ngoPhone').value;
        const address = document.getElementById('ngoAddress').value;
    
        if (!name || !email || !password || !phone || !address) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please fill all required fields',
                icon: 'warning',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }
    
        Swal.fire({
            title: 'Registering NGO',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });
    
        fetch('http://localhost:5000/api/register_ngo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                phone,
                address,
                city: document.getElementById('ngoCity').value,
                state: document.getElementById('ngoState').value,
                zip: document.getElementById('ngoZip').value,
                country: document.getElementById('ngoCountry').value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'Your NGO has been registered.',
                    icon: 'success',
                    confirmButtonText: 'Go to Dashboard',
                    confirmButtonColor: '#FF6B6B'
                }).then(() => {
                    document.getElementById('ngoRegistrationForm').reset();
                    showPage('dashboard');
                });
            } else {
                throw new Error(data.error || 'Unknown error');
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Registration Failed',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
        });
    };
    
    const loginNGO = () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please enter your email and password',
                icon: 'warning',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }

        Swal.fire({
            title: 'Logging in',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        fetch('http://localhost:5000/api/login_ngo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(({ status, body }) => {
            if (status === 200) {
                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    localStorage.setItem('ngoLoggedIn', 'true');
                    localStorage.setItem('ngoData', JSON.stringify(body));
                    setIsLoggedIn(true);
                    setNgoData(body);
                    fetch('http://localhost:5000/api/ngo_reports', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: body.email })
                    })
                    .then(res => res.json())
                    .then(data => {
                        setReports(data);
                    })
                    .catch(error => {
                        console.error('Error fetching reports:', error);
                    });
                });
            } else {
                Swal.fire({
                    title: 'Login Failed',
                    text: body.error || 'Unknown error occurred.',
                    icon: 'error',
                    confirmButtonColor: '#FF6B6B'
                });
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong while logging in.',
                icon: 'error',
                confirmButtonColor: '#FF6B6B'
            });
        });        
    };

    const logoutNGO = () => {
        Swal.fire({
            title: 'Logout Confirmation',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Logout',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#FF6B6B'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('ngoLoggedIn');
                setIsLoggedIn(false);
                setNgoData(null);
                Swal.fire({
                    title: 'Logged Out',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    };

    const checkNGOLogin = () => {
        const loggedIn = localStorage.getItem('ngoLoggedIn') === 'true';
        if (loggedIn) {
            setIsLoggedIn(true);
            setNgoData(JSON.parse(localStorage.getItem('ngoData')));
        }
    };

    const submitContact = () => {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const message = document.getElementById('contactMessage').value;

        if (!name || !email || !phone || !message) {
            Swal.fire({
                title: 'Missing Information',
                text: 'Please fill all required fields',
                icon: 'warning',
                confirmButtonColor: '#FF6B6B'
            });
            return;
        }

        Swal.fire({
            title: 'Sending Message',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        setTimeout(() => {
            Swal.fire({
                title: 'Message Sent!',
                text: 'We will get back to you soon.',
                icon: 'success',
                confirmButtonColor: '#FF6B6B'
            }).then(() => {
                document.getElementById('contactForm').reset();
            });
        }, 1500);
    };

    const viewReportDetails = () => {
        Swal.fire({
            title: 'Report Details',
            html: `
                <div class="text-left">
                    <div class="mb-3">
                        <p class="text-sm text-gray-600">Reported by:</p>
                        <p class="font-semibold">Rahul Singh</p>
                    </div>
                    <div class="mb-3">
                        <p class="text-sm text-gray-600">Contact:</p>
                        <p class="font-semibold">+91 98765-43210</p>
                    </div>
                    <div class="mb-3">
                        <p class="text-sm text-gray-600">Location:</p>
                        <p class="font-semibold">Connaught Place, New Delhi</p>
                    </div>
                    <div class="mb-3">
                        <p class="text-sm text-gray-600">Status:</p>
                        <p class="font-semibold">Rescued</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600">Notes:</p>
                        <p>Dog with injured paw, treated and now in recovery</p>
                    </div>
                </div>
            `,
            imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
            imageAlt: 'Injured Animal',
            confirmButtonText: 'Close',
            confirmButtonColor: '#FF6B6B'
        });
    };

    const acceptCase = () => {
        Swal.fire({
            title: 'Accept Rescue Request',
            text: 'Are you sure you want to accept this rescue request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Accept',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#FF6B6B'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Request Accepted!',
                    text: 'You are now responsible for this rescue. Opening navigation...',
                    icon: 'success',
                    confirmButtonText: 'Navigate Now',
                    confirmButtonColor: '#FF6B6B'
                }).then(() => {
                    setIsDirectionsModalOpen(true);
                });
            }
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar showPage={showPage} toggleMenu={toggleMenu} />
            <MobileMenu isOpen={isMobileMenuOpen} showPage={showPage} />
            <AlertBadge isVisible={isAlertVisible} acceptEmergencyRequest={acceptEmergencyRequest} />
            {currentPage === 'home' && (
                <HomeSection
                    handleFile={handleFile}
                    imagePreview={imagePreview}
                    isAnalyzingImage={isAnalyzingImage}
                    isLoadingLocation={isLoadingLocation}
                    locationText={locationText}
                    location={location}
                    userFormVisible={userFormVisible}
                    submitReport={submitReport}
                />
            )}
            {currentPage === 'ngo-register' && <NGORegisterSection registerNGO={registerNGO} />}
            {currentPage === 'dashboard' && (
                <DashboardSection
                    isLoggedIn={isLoggedIn}
                    ngoData={ngoData}
                    loginNGO={loginNGO}
                    logoutNGO={logoutNGO}
                    showPage={showPage}
                    viewReportDetails={viewReportDetails}
                    acceptCase={acceptCase}
                    reports={reports}
                />
            )}
            {currentPage === 'about' && <AboutSection />}
            {currentPage === 'contact' && <ContactSection submitContact={submitContact} />}
            <Footer showPage={showPage} />
            <DirectionsModal
                isOpen={isDirectionsModalOpen}
                closeModal={closeDirectionsModal}
                updateRescueStatus={updateRescueStatus}
                location={location}
                rescueStatus={rescueStatus}
            />
        </div>
    );
};

export default App;