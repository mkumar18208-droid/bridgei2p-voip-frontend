import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { 
  Phone, Mail, MapPin, Menu, X, Check, ChevronRight, 
  PhoneCall, PhoneForwarded, PhoneIncoming, Headphones,
  BarChart3, Shield, Clock, Users, Mic, Volume2, Globe,
  Zap, Settings, MessageSquare, Lock, Server, Star, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Assets
const LOGO_URL = "https://customer-assets.emergentagent.com/job_f0d7972b-4050-442c-8b67-93f619f7c74f/artifacts/9ib3d8d2_image.png";
const TELECOM_AUTH_URL = "https://customer-assets.emergentagent.com/job_f0d7972b-4050-442c-8b67-93f619f7c74f/artifacts/6i9j4ke7_image.png";
const HERO_IMAGE = "https://images.pexels.com/photos/7709148/pexels-photo-7709148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const CITY_BG = "https://images.unsplash.com/photo-1665202837907-5360f77f22e0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwzfHxoeWRlcmFiYWQlMjBjeWJlciUyMHRvd2VycyUyMHNreWxpbmUlMjBuaWdodHxlbnwwfHx8fDE3NzE0ODU3MzR8MA&ixlib=rb-4.1.0&q=85";

// Contact Info - Updated
const CONTACT_INFO = {
  phone: "+91 91330 15993",
  emails: ["Jack.s@bridgei2p.com", "sales@bridgei2p.com"],
  address: "CoKarma - Coworking Space, Plot No. 5, Inorbit Mall Rd, opposite Durgam Cheruvu, Doctor's Colony, HITEC City, Hyderabad, Telangana 500081",
  mapUrl: "https://maps.app.goo.gl/hzE7AJrg2KmMCVNS8"
};

// Navigation - White Header with Dark Theme Body
const NavBar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-white py-2' : 'bg-white py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Telecom Badge */}
        <a href="#" className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Bridgei2p Logo" className="h-10 w-auto" data-testid="logo" />
          <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
          <img src={TELECOM_AUTH_URL} alt="DOT Authorized" className="hidden sm:block h-10 w-auto" data-testid="telecom-badge" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="nav-link-dark text-sm font-medium">
              {item.label}
            </a>
          ))}
          <a href="#lead-form">
            <Button 
              data-testid="nav-cta-btn"
              className="bg-[#F98E29] hover:bg-[#e07a1f] text-black font-bold px-6 py-2 rounded-full transition-all"
            >
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          data-testid="mobile-menu-btn"
          className="md:hidden text-gray-800 z-[110] relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - White */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-xl font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#lead-form" onClick={() => setMobileMenuOpen(false)}>
            <Button className="bg-[#F98E29] hover:bg-[#e07a1f] text-black font-bold w-full py-4 rounded-full mt-4">
              Get Started
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

// Hero Section - Dark Theme
const HeroSection = () => {
  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center pt-24 pb-16 hero-bg overflow-hidden"
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${CITY_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fadeInUp">
          {/* Trust Badge */}
          <div className="trust-badge inline-flex" data-testid="trust-badge">
            <Shield size={14} />
            <span>DOT Authorized - ISP-VNO Category "A"</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Powering{' '}
            <span className="text-[#F98E29]">Hyderabad's</span>{' '}
            Business Conversations
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl">
            Enterprise-grade VoIP & Cloud Contact Center Solutions for modern call centers. 
            Save up to 60% on communication costs with HD voice quality.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#lead-form">
              <Button 
                data-testid="hero-cta-btn"
                className="bg-[#F98E29] hover:bg-white text-black font-bold px-8 py-4 rounded-full text-lg glow-orange animate-pulse-glow"
              >
                Get Free Consultation
                <ChevronRight className="ml-2" size={20} />
              </Button>
            </a>
            <a href="#pricing">
              <Button 
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg"
              >
                View Pricing
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-4">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-zinc-500">Businesses Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.99%</div>
              <div className="text-sm text-zinc-500">Uptime Guaranteed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-zinc-500">Expert Support</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative hidden lg:block animate-fadeInUp delay-200">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <img 
              src={HERO_IMAGE} 
              alt="Call Center Solutions"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-[#0F0F0F] border border-white/10 rounded-xl p-4 float-animation">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F98E29]/20 rounded-full flex items-center justify-center">
                <Phone className="text-[#F98E29]" size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold">HD Voice Quality</div>
                <div className="text-xs text-zinc-500">Crystal Clear Calls</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section - Dark Theme
const ServicesSection = () => {
  const services = [
    {
      icon: <Phone size={32} />,
      title: "VoIP Business Phone System",
      description: "Advanced multiline telephone system with call recording, IVR, conference calls, and CRM integration. Perfect for businesses of all sizes.",
      features: ["Speed Dialing", "Call Recording", "Conference Calls", "CRM Integration"]
    },
    {
      icon: <Headphones size={32} />,
      title: "Cloud Contact Center",
      description: "Complete cloud-based contact center solution for handling inbound and outbound customer contacts across multiple channels.",
      features: ["Multi-channel Support", "Real-time Analytics", "Auto Dialers", "Queue Management"]
    }
  ];

  return (
    <section id="services" data-testid="services-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Our Services</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            VoIP Service Provider in Hyderabad
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
            Transform your business communication with our enterprise-grade solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-8 hover:border-[#F98E29]/30 transition-all duration-300 card-hover"
              data-testid={`service-card-${index}`}
            >
              <div className="w-16 h-16 bg-[#F98E29]/10 rounded-xl flex items-center justify-center text-[#F98E29] mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">{service.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={16} className="text-[#F98E29]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Authorization Badge */}
        <div className="mt-16 flex justify-center">
          <div className="bg-[#0F0F0F] border border-white/10 rounded-xl p-6 inline-flex items-center gap-6">
            <div className="bg-white rounded-lg p-3">
              <img src={TELECOM_AUTH_URL} alt="DOT Authorization" className="h-16 w-auto" />
            </div>
            <div>
              <div className="text-sm text-zinc-500">Authorized by</div>
              <div className="font-semibold">Dept of Telecommunications</div>
              <div className="text-sm text-zinc-400">Ministry of Telecommunications, Govt. of India</div>
              <div className="text-xs text-[#F98E29] mt-1">ISP-VNO, Category "A" (All India Service Area)</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section - Dark Theme
const FeaturesSection = () => {
  const features = [
    { icon: <PhoneCall size={24} />, title: "Smart Dialing", desc: "Auto, predictive & progressive dialers" },
    { icon: <PhoneForwarded size={24} />, title: "Call Forwarding", desc: "Route calls anywhere, anytime" },
    { icon: <PhoneIncoming size={24} />, title: "Call Transfer", desc: "Seamless call transfers between teams" },
    { icon: <Users size={24} />, title: "Call Conference", desc: "Multi-party conference calls" },
    { icon: <Clock size={24} />, title: "Call Queuing", desc: "Keep customers engaged during wait" },
    { icon: <Mic size={24} />, title: "Call Recording", desc: "Record & review for quality assurance" },
    { icon: <Volume2 size={24} />, title: "Voicemail", desc: "Custom voicemail with transcription" },
    { icon: <BarChart3 size={24} />, title: "Call Analytics", desc: "Detailed reports & insights" },
    { icon: <Globe size={24} />, title: "Global Reach", desc: "International toll-free lines" },
    { icon: <Zap size={24} />, title: "IVR System", desc: "Interactive voice response" },
    { icon: <Settings size={24} />, title: "CRM Integration", desc: "Salesforce, Zoho, HubSpot & more" },
    { icon: <Lock size={24} />, title: "Secure & Encrypted", desc: "TLS & SRTP encryption" },
  ];

  return (
    <section id="features" data-testid="features-section" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
            Powerful features designed for modern call centers and enterprises
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card group"
              data-testid={`feature-card-${index}`}
            >
              <div className="w-12 h-12 bg-[#F98E29]/10 rounded-lg flex items-center justify-center text-[#F98E29] mb-4 group-hover:bg-[#F98E29]/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section - Dark Theme
const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Zap size={28} />,
      title: "Save Up to 60%",
      description: "Cut your monthly phone costs with our budget-friendly VoIP solutions. No contracts, no hidden charges."
    },
    {
      icon: <Shield size={28} />,
      title: "Enterprise Security",
      description: "TLS & SRTP encryption, cloud backup with Amazon S3, Google Drive integration. Your data is safe."
    },
    {
      icon: <Server size={28} />,
      title: "99.99% Uptime",
      description: "Modular network by professional engineers. High reliability and dependability guaranteed."
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      description: "In-house expert support available round the clock. Your business needs are our priority."
    },
    {
      icon: <Volume2 size={28} />,
      title: "HD Voice Quality",
      description: "Crystal-clear HD voice with wide-band audio. No more compromises on call quality."
    },
    {
      icon: <Settings size={28} />,
      title: "Easy Setup",
      description: "Simple procedures, no technical expertise needed. Add virtual extensions without cables."
    }
  ];

  return (
    <section id="benefits" data-testid="benefits-section" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Benefits</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Why Choose Bridgei2p?
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
            Join 500+ businesses who trust us for their communication needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card"
              data-testid={`benefit-card-${index}`}
            >
              <div className="w-14 h-14 bg-[#F98E29]/10 rounded-xl flex items-center justify-center text-[#F98E29] mb-5">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Section - Dark Theme
const PricingSection = () => {
  const plans = [
    {
      name: "Bridgei2p Core",
      price: "1,500",
      features: [
        "Unlimited Calls To USA & Canada",
        "1 Free US Number",
        "3 Way Calling",
        "Direct End User Support",
        "Voicemail to Email Notifications",
        "Call Forwarding",
        "Call Recording",
        "Call Waiting",
        "Web Panel Access (Call Logs)"
      ]
    },
    {
      name: "Bridgei2p Premium",
      price: "1,850",
      features: [
        "Everything in Bridgei2p Core+",
        "Black List/Blocking",
        "Auto Attendant",
        "Call Hunting",
        "Custom Greetings",
        "Reports Via Email",
        "Music On Hold",
        "Standard Call Queue",
        "Find Me Follow Me",
        "Caller ID Control",
        "IVR",
        "Ring Groups",
        "Country Blocking"
      ]
    },
    {
      name: "Bridgei2p Optimum",
      price: "2,250",
      popular: true,
      features: [
        "Everything in Bridgei2p Premium+",
        "Communicator Desktop App",
        "Call Greetings",
        "Call Park",
        "Multi-level IVR",
        "Bridge Conference",
        "Employee Directory",
        "Chat",
        "Professionally Recorded Greeting",
        "Forward To Device",
        "User Working Hours",
        "Business Hours",
        "Call Pickup",
        "Call Monitoring",
        "Remote Access",
        "CRM Integration (Web Based)"
      ]
    },
    {
      name: "Bridgei2p Ultimate",
      price: "2,650",
      features: [
        "Everything in Bridgei2p Optimum+",
        "Free India Call Forwarding",
        "Outlook Integration",
        "Communicator Desktop and Mobile App",
        "Enhanced Call Queue",
        "Integrated Fax",
        "SMS",
        "Call Screening",
        "Speakerphone Page",
        "Intelligent Reports/Analytics"
      ]
    },
    {
      name: "Bridgei2p Enterprise",
      price: "3,250",
      features: [
        "Everything in Bridgei2p Ultimate+",
        "Web Browser Integration",
        "Barge/Whisper",
        "Teams Integration",
        "Skype Integration",
        "Web Meeting",
        "Bring Your Own Carrier"
      ]
    }
  ];

  return (
    <section id="pricing" data-testid="pricing-section" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Pricing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Choose Your Plan
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
            Transparent pricing, no hidden charges. Cancel anytime without penalty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              data-testid={`pricing-card-${index}`}
            >
              <h3 className="text-lg font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-zinc-500 text-lg">&#8377;</span>
                  <span className="text-3xl font-bold text-[#F98E29]">{plan.price}</span>
                </div>
                <div className="text-sm text-zinc-500">Per user/Month</div>
              </div>
              
              <a href="#lead-form">
                <Button 
                  className={`w-full mb-6 rounded-lg ${
                    plan.popular 
                      ? 'bg-[#F98E29] hover:bg-white text-black' 
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                  data-testid={`pricing-btn-${index}`}
                >
                  Enquire Now
                </Button>
              </a>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    <Check size={14} className="text-[#F98E29] mt-1 flex-shrink-0" />
                    <span className={idx === 0 && index > 0 ? 'text-[#F98E29]' : 'text-zinc-400'}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Lead Form Section - Dark Theme
const LeadFormSection = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    website: '',
    work_email: '',
    phone_number: '',
    query: '',
    opt_in: false
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'work_email' && emailVerified) {
      setEmailVerified(false);
      setOtpSent(false);
      setOtp('');
    }
  };

  const sendOTP = async () => {
    if (!formData.work_email) {
      toast.error('Please enter your work email first');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.work_email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSendingOtp(true);
    try {
      const response = await axios.post(`${API}/send-otp`, { email: formData.work_email });
      if (response.data.success) {
        setOtpSent(true);
        toast.success('OTP sent to your email!');
        
        try {
          const otpResponse = await axios.get(`${API}/get-otp/${encodeURIComponent(formData.work_email)}`);
          toast.info(`Demo OTP: ${otpResponse.data.otp}`, { duration: 10000 });
        } catch (e) {}
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    try {
      const response = await axios.post(`${API}/verify-otp`, { 
        email: formData.work_email, 
        otp: otp 
      });
      if (response.data.success) {
        setEmailVerified(true);
        toast.success('Email verified successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Invalid OTP');
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      toast.error('Please verify your email first');
      return;
    }

    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
    const cleanedPhone = formData.phone_number.replace(/[\s\-]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      toast.error('Please enter a valid Indian phone number');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/leads`, {
        ...formData,
        email_verified: true
      });
      toast.success('Thank you! Our team will contact you shortly.');
      setFormData({
        first_name: '',
        last_name: '',
        company_name: '',
        website: '',
        work_email: '',
        phone_number: '',
        query: '',
        opt_in: false
      });
      setEmailVerified(false);
      setOtpSent(false);
      setOtp('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-form" data-testid="lead-form-section" className="py-24 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="form-section p-8 md:p-12">
          <div className="text-center mb-10">
            <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Get Started</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Request a Free Consultation
            </h2>
            <p className="text-zinc-400 mt-4">
              Fill out the form below and our VoIP experts will get in touch within 24 hours
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">First Name *</label>
                <Input
                  data-testid="input-first-name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Last Name *</label>
                <Input
                  data-testid="input-last-name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Company Name *</label>
              <Input
                data-testid="input-company-name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="Your Company"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Website *</label>
              <Input
                data-testid="input-website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Work Email *</label>
              <div className="flex gap-3">
                <Input
                  data-testid="input-work-email"
                  name="work_email"
                  type="email"
                  value={formData.work_email}
                  onChange={handleChange}
                  required
                  disabled={emailVerified}
                  className="input-field flex-1"
                  placeholder="john@company.com"
                />
                {!emailVerified && (
                  <Button
                    type="button"
                    onClick={sendOTP}
                    disabled={sendingOtp || !formData.work_email}
                    data-testid="send-otp-btn"
                    className="bg-[#F98E29] hover:bg-white text-black font-semibold px-6 rounded-lg whitespace-nowrap"
                  >
                    {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                  </Button>
                )}
                {emailVerified && (
                  <div className="flex items-center gap-2 text-green-500 px-4">
                    <Check size={20} />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
              </div>
            </div>

            {otpSent && !emailVerified && (
              <div className="space-y-3">
                <label className="block text-sm text-zinc-400">Enter OTP *</label>
                <div className="flex items-center gap-4">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    data-testid="otp-input"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="bg-black/50 border-white/10 text-white" />
                      <InputOTPSlot index={1} className="bg-black/50 border-white/10 text-white" />
                      <InputOTPSlot index={2} className="bg-black/50 border-white/10 text-white" />
                      <InputOTPSlot index={3} className="bg-black/50 border-white/10 text-white" />
                      <InputOTPSlot index={4} className="bg-black/50 border-white/10 text-white" />
                      <InputOTPSlot index={5} className="bg-black/50 border-white/10 text-white" />
                    </InputOTPGroup>
                  </InputOTP>
                  <Button
                    type="button"
                    onClick={verifyOTP}
                    disabled={verifyingOtp || otp.length !== 6}
                    data-testid="verify-otp-btn"
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 rounded-lg"
                  >
                    {verifyingOtp ? 'Verifying...' : 'Verify'}
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">Check your email for the 6-digit OTP</p>
              </div>
            )}

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Phone Number *</label>
              <Input
                data-testid="input-phone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                className="input-field w-full"
                placeholder="+91 98765 43210"
              />
              <p className="text-xs text-zinc-600 mt-1">Enter valid Indian mobile number</p>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-2">Type your Query</label>
              <textarea
                data-testid="input-query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                rows={4}
                className="input-field w-full resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="opt-in"
                checked={formData.opt_in}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, opt_in: checked }))}
                data-testid="opt-in-checkbox"
                className="mt-1"
              />
              <label htmlFor="opt-in" className="text-sm text-zinc-400 cursor-pointer">
                Opt-in: I'd like to learn more about Bridgei2p's plans & services
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !emailVerified}
              data-testid="submit-form-btn"
              className="w-full bg-[#F98E29] hover:bg-white text-black font-bold py-4 rounded-full text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner"></span>
                  Submitting...
                </span>
              ) : (
                'Request Free Consultation'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Contact Section - Dark Theme with Updated Info
const ContactSection = () => {
  return (
    <section id="contact" data-testid="contact-section" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#F98E29] text-sm font-bold tracking-widest uppercase">Contact Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
            Get in Touch
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-lg">
            Ready to transform your business communication? Contact our Hyderabad team today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="contact-item flex-col text-center p-6" data-testid="contact-phone">
            <div className="w-14 h-14 bg-[#F98E29]/10 rounded-full flex items-center justify-center text-[#F98E29] mb-4 mx-auto">
              <Phone size={24} />
            </div>
            <h3 className="font-semibold mb-2">Phone</h3>
            <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-zinc-400 hover:text-[#F98E29] transition-colors">
              {CONTACT_INFO.phone}
            </a>
          </div>

          <div className="contact-item flex-col text-center p-6" data-testid="contact-email">
            <div className="w-14 h-14 bg-[#F98E29]/10 rounded-full flex items-center justify-center text-[#F98E29] mb-4 mx-auto">
              <Mail size={24} />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <div className="space-y-1">
              {CONTACT_INFO.emails.map((email, idx) => (
                <a key={idx} href={`mailto:${email}`} className="block text-zinc-400 hover:text-[#F98E29] transition-colors text-sm">
                  {email}
                </a>
              ))}
            </div>
          </div>

          <div className="contact-item flex-col text-center p-6" data-testid="contact-location">
            <div className="w-14 h-14 bg-[#F98E29]/10 rounded-full flex items-center justify-center text-[#F98E29] mb-4 mx-auto">
              <MapPin size={24} />
            </div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-zinc-400 text-sm">
              HITEC City, Hyderabad<br />
              Telangana, India
            </p>
          </div>
        </div>

        {/* Address Card with Map */}
        <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-bold text-xl mb-4">Office Address</h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {CONTACT_INFO.address}
              </p>
              <a 
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#F98E29] font-semibold hover:underline"
                data-testid="map-link"
              >
                <MapPin size={18} />
                View on Google Maps
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.298066619867!2d78.37233827516645!3d17.440862683462895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69f7%3A0x6f8c6c7c2e0c0c0c!2sInorbit%20Mall%2C%20Madhapur!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
                data-testid="google-map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer - Dark Theme
const Footer = () => {
  return (
    <footer data-testid="footer" className="py-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={LOGO_URL} alt="Bridgei2p" className="h-8 w-auto" />
            <span className="text-zinc-500 text-sm">
              VoIP Service Provider in Hyderabad
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>&copy; {new Date().getFullYear()} Bridgei2p Telecommunications Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-[#F98E29]" />
            <span>Authorized by Dept of Telecommunications, Govt. of India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505]">
      <NavBar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <BenefitsSection />
      <PricingSection />
      <LeadFormSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
