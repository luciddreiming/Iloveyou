document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const appContainer = document.getElementById("app-container");
  const containers = document.querySelectorAll(".container");
  const splitScreenContainer = document.getElementById(
    "split-screen-container"
  );
  const fullScreenContainer = document.getElementById("full-screen-container");
  const statusBar = document.querySelector(".status-bar");

  // Other Services Elements
  const serviceDetails = document.getElementById("serviceDetails");
  const donationAmount = document.getElementById("donationAmount");
  const otherServicesForm = document.getElementById("otherServicesForm");

  // Data storage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let currentUser = null;
  let requests = JSON.parse(localStorage.getItem("requests")) || [];
  let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
  let otherServices = JSON.parse(localStorage.getItem("otherServices")) || [];

  // Page loading functions
  function loadLoginSignupPage() {
    fetch("login-signup.html")
      .then((response) => response.text())
      .then((html) => {
        appContainer.innerHTML = html;
        initializeLoginSignup();
      });
  }

  function loadResidentPage() {
    fetch("resident.html")
      .then((response) => response.text())
      .then((html) => {
        appContainer.innerHTML = html;
        initializeResidentPage();
      });
  }

  function loadStaffPage() {
    fetch("staff.html")
      .then((response) => response.text())
      .then((html) => {
        appContainer.innerHTML = html;
        initializeStaffPage();
      });
  }

  function loadAdminPage() {
    fetch("admin.html")
      .then((response) => response.text())
      .then((html) => {
        appContainer.innerHTML = html;
        initializeAdminPage();
      });
  }

  // Internationalization (i18n) support
  const translations = {
    en: {
      // General
      title: "Barangay Management System",
      welcome:
        "Access and manage essential barangay services online. Submit requests, complaints, and stay updated with Barangay Longos, Malabon City.",
      select_language: "Select Language",

      // Login
      login_greeting: "Hello! Come and log in!",
      login_title: "Log In",
      email: "Email",
      password: "Password",
      login_button: "Log In",
      no_account: "Don't have an account?",
      create_account: "Create an Account",
      caps_warning: "⚠️ Caps Lock is on",

      // Signup
      signup_title: "Create an Account",
      first_name: "First Name",
      last_name: "Last Name",
      user_type: "Type of User",
      select_user_type_option: "Select User Type",
      confirm_password: "Confirm Password",
      signup_button: "Sign Up",
      have_account: "Already have an account?",
      sign_in: "Sign In",

      // Resident Dashboard
      select_service: "Select A Service",
      request_document: "Request a Document",
      request_document_desc:
        "Choose the document you need, answer the form, submit, and pick it up.",
      file_complaint: "File a Complaint",
      file_complaint_desc:
        "Report complaint for the improvement of our community.",
      other_services: "Other Services",
      other_services_desc: "Submit suggestions, feedback, or donations",

      // Tracking
      my_submissions: "My Submissions",
      track_submissions: "Track your requests and complaints",
      my_requests: "My Requests",
      my_complaints: "My Complaints",
      my_other_services: "My Other Services",
      request_id: "Request ID",
      complaint_id: "Complaint ID",
      service_id: "Service ID",
      type: "Type",
      date_submitted: "Date Submitted",
      status: "Status",
      actions: "Actions",

      // Request Form
      request_form: "Request Form",
      first_name_placeholder: "Please type your first name.",
      last_name_placeholder: "Please type your last name.",
      address_placeholder: "House No., Street, Barangay, City",
      request: "Request",
      select_request: "Select Request",
      barangay_id: "Barangay ID",
      solo_parent_id: "Solo Parent ID",
      certificate_indigency: "Certificate of Indigency",
      certificate_residency: "Certificate of Residency",
      address: "Address",
      contact_number: "Contact Number",
      dob: "Date of Birth",
      gender: "Gender",
      select_gender: "Select Gender",
      male: "Male",
      female: "Female",
      other_gender: "Other",
      submit_request: "Submit Request",

      // Complaint Form
      complaint_form: "Complaint Form",
      complaint_type: "Type of Complaint",
      select_complaint_type: "Choose the type of your complaint",
      noise: "Noise Complaint",
      property: "Property Issue",
      sanitation: "Sanitation Concern",
      safety: "Safety Concern",
      other_complaint: "Other",
      complaint_details: "Complaint Details",
      complaint_details_placeholder: "Please describe your complaint.",
      submit_complaint: "Submit Complaint",

      // Other Services
      other_services_title: "Other Services",
      service_type: "Service Type",
      select_service_type: "Select service type",
      suggestion: "Suggestion",
      feedback: "Feedback",
      donation: "Donation",
      volunteer: "Volunteer",
      blotter: "Blotter",
      details: "Details",
      donation_amount: "Donation Amount (PHP)",
      bug: "Report a Bug or Website Error",
      submit_service: "Submit",

      // Staff Portal
      staff_portal: "Barangay Staff Portal",
      staff_password: "Staff Password",
      authenticate: "Authenticate",
      staff_dashboard: "Barangay Staff Dashboard",
      manage_submissions: "Manage Submissions",
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      update: "Update",

      // Admin Portal
      admin_portal: "Admin Portal",
      admin_password: "Admin Password",
      admin_dashboard: "Admin Dashboard",
      status_board: "Status Board",
      total_users: "Total Users",
      active_staff: "Active Staff",
      pending_issues: "Pending Issues",
      send_updates: "Send Updates to Residents",
      resident_email: "Resident Email",
      select_resident: "Select Resident",
      concern_type: "Concern Type",
      select_concern: "Select Concern Type",
      request_update: "Request Update",
      complaint_update: "Complaint Update",
      other_update: "Other Service Update",
      general_announcement: "General Announcement",
      subject: "Subject",
      message: "Message",
      send_email: "Send Email",

      // Common
      back: "Back",
      logout: "Logout",
      notifications: "Notifications",
      no_notifications: "No notifications.",
      view: "View",
      delete: "Delete",
      print: "Print",
      id: "ID",
      resident: "Resident",
      date: "Date",
      updated_by: "Updated By",

      // Statuses
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      typing_indicator: "Typing...",
      greeting_response:
        "Hello! How can I assist you with Barangay services today?",
      services_response:
        "Our barangay offers various services including document requests, complaint filing, and other community services. You can access these from the main menu.",
      documents_response:
        "You can request documents like Barangay ID, Certificate of Residency, or Certificate of Indigency through the 'Request a Document' service.",
      complaints_response:
        "To file a complaint, please use the 'File a Complaint' service. Provide as many details as possible to help us address your concern.",
      location_response:
        "Barangay Longos is located in Malabon City, Philippines. Our office is open from 8:00 AM to 5:00 PM, Monday to Friday.",
      contact_response:
        "You can reach our barangay office at (02) 123-4567 during office hours.",
      default_response:
        "I'm sorry, I didn't understand that. Could you rephrase your question or try asking about barangay services, documents, or complaints?",
      history:
        "Malabon is a historic coastal city in northern Metro Manila, Philippines, known for its rich cultural heritage and vibrant local traditions.",
      bot_message: "Longosian Assistant says",
      send_button: "Send",
      type_message: "Type your message...",
      chatbot_title: "Longosian - Barangay Longos Help Desk Assistant",
    },
    tl: {
      title: "Sistema ng Pamamahala ng Barangay",
      welcome:
        "I-access at pamahalaan ang mahahalagang serbisyo ng barangay online. Maghain ng mga kahilingan, reklamo, at manatiling updated sa Barangay Longos, Lungsod ng Malabon.",
      select_language: "Pumili ng Wika",

      login_greeting: "Kamusta po! Halina't Mag-log in!",
      login_title: "Mag-log In",
      email: "Email",
      password: "Password",
      login_button: "Mag-log In",
      no_account: "Walang account?",
      create_account: "Gumawa ng Account",
      caps_warning: "⚠️ Naka-on ang Caps Lock",

      signup_title: "Gumawa ng Account",
      first_name: "Pangalan",
      last_name: "Apelyido",
      user_type: "Uri ng Gumagamit",
      select_user_type_option: "Pumili ng Uri ng Gumagamit",
      confirm_password: "Kumpirmahin ang Password",
      signup_button: "Mag-sign Up",
      have_account: "Mayroon nang account?",
      sign_in: "Mag-sign In",

      select_service: "Pumili ng Serbisyo",
      request_document: "Humiling ng Dokumento",
      request_document_desc:
        "Piliin ang dokumentong kailangan mo, sagutan ang form, isumite, at kunin ito.",
      file_complaint: "Maghain ng Reklamo",
      file_complaint_desc:
        "Mag-report ng reklamo para sa pag-unlad ng ating komunidad.",
      other_services: "Iba pang Serbisyo",
      other_services_desc: "Magsumite ng mga mungkahi, feedback, o donasyon",

      my_submissions: "Aking mga Isinumite",
      track_submissions: "Subaybayan ang iyong mga kahilingan at reklamo",
      my_requests: "Aking mga Kahilingan",
      my_complaints: "Aking mga Reklamo",
      my_other_services: "Aking Iba pang Serbisyo",
      request_id: "ID ng Kahilingan",
      complaint_id: "ID ng Reklamo",
      service_id: "ID ng Serbisyo",
      type: "Uri",
      date_submitted: "Petsa ng Pagsusumite",
      status: "Katayuan",
      actions: "Mga Aksyon",

      request_form: "Form ng Kahilingan",
      first_name_placeholder: "Paki-type ang iyong unang pangalan.",
      last_name_placeholder: "Paki-type ang iyong apelyido.",
      address_placeholder: "Bilang ng Bahay, Kalye, Barangay, Lungsod",
      request: "Kahilingan",
      select_request: "Pumili ng Kahilingan",
      barangay_id: "Barangay ID",
      solo_parent_id: "Solo Parent ID",
      certificate_indigency: "Sertipiko ng Indigency",
      certificate_residency: "Sertipiko ng Residency",
      address: "Address",
      contact_number: "Numero ng Kontak",
      dob: "Petsa ng Kapanganakan",
      gender: "Kasarian",
      select_gender: "Pumili ng Kasarian",
      male: "Lalaki",
      female: "Babae",
      other_gender: "Iba pa",
      submit_request: "Isumite ang Kahilingan",

      complaint_form: "Form ng Reklamo",
      complaint_type: "Uri ng Reklamo",
      select_complaint_type: "Piliin ang uri ng iyong reklamo",
      noise: "Reklamo sa Ingay",
      property: "Isyu sa Ari-arian",
      sanitation: "Alalahanin sa Kalinisan",
      safety: "Alalahanin sa Kaligtasan",
      other_complaint: "Iba pa",
      complaint_details: "Mga Detalye ng Reklamo",
      complaint_details_placeholder: "Paki-detalye ang iyong reklamo.",
      submit_complaint: "Isumite ang Reklamo",

      other_services_title: "Iba pang Serbisyo",
      service_type: "Uri ng Serbisyo",
      select_service_type: "Pumili ng uri ng serbisyo",
      suggestion: "Mungkahi",
      feedback: "Feedback",
      donation: "Donasyon",
      volunteer: "Boluntaryo",
      blotter: "Blotter",
      details: "Mga Detalye",
      donation_amount: "Halaga ng Donasyon (PHP)",
      bug: "I-ulat ang Bug o Mali sa Website",
      submit_service: "Isumite",

      staff_portal: "Portal ng Kawani ng Barangay",
      staff_password: "Password ng Kawani",
      authenticate: "Patunayan",
      staff_dashboard: "Dashboard ng Kawani ng Barangay",
      manage_submissions: "Pamahalaan ang mga Isinumite",
      pending: "Nakabinbin",
      processing: "Pinoproseso",
      completed: "Natapos",
      update: "I-update",

      admin_portal: "Portal ng Admin",
      admin_password: "Password ng Admin",
      admin_dashboard: "Dashboard ng Admin",
      status_board: "Board ng Katayuan",
      total_users: "Kabuuang mga Gumagamit",
      active_staff: "Aktibong Kawani",
      pending_issues: "Nakabinbing mga Isyu",
      send_updates: "Magpadala ng mga Update sa mga Residente",
      resident_email: "Email ng Residente",
      select_resident: "Pumili ng Residente",
      concern_type: "Uri ng Alalahanin",
      select_concern: "Pumili ng Uri ng Alalahanin",
      request_update: "Update ng Kahilingan",
      complaint_update: "Update ng Reklamo",
      other_update: "Update ng Iba pang Serbisyo",
      general_announcement: "Pangkalahatang Anunsyo",
      subject: "Paksa",
      message: "Mensahe",
      send_email: "Magpadala ng Email",

      back: "Bumalik",
      logout: "Mag-logout",
      notifications: "Mga Abiso",
      no_notifications: "Walang abiso.",
      view: "Tingnan",
      delete: "Burahin",
      print: "I-print",
      id: "ID",
      resident: "Residente",
      date: "Petsa",
      updated_by: "Na-update ni",

      pending: "Nakaantabay",
      processing: "Pinoproseso",
      completed: "Nakumpleto",
      typing_indicator: "Nagta-type...",
      greeting_response:
        "Kamusta! Paano kita matutulungan sa mga serbisyo ng Barangay ngayon?",
      services_response:
        "Ang aming barangay ay nag-aalok ng iba't ibang serbisyo tulad ng paghingi ng dokumento, pagrereklamo, at iba pang serbisyong pangkomunidad.",
      documents_response:
        "Maari kang humiling ng mga dokumento tulad ng Barangay ID, Sertipiko ng Paninirahan, o Sertipiko ng Kahirapan.",
      complaints_response:
        "Upang magsumite ng reklamo, pakigamit ang 'File a Complaint' na serbisyo.",
      location_response:
        "Ang Barangay Longos ay matatagpuan sa Malabon City, Pilipinas.",
      contact_response:
        "Maari mo kaming tawagan sa (02) 123-4567 sa oras ng opisina.",
      default_response:
        "Paumanhin, hindi ko naintindihan iyon. Maari mo bang ulitin ang iyong tanong?",
      history:
        "Ang Malabon ay isang makasaysayang baybaying lungsod sa hilagang bahagi ng Metro Manila.",
      bot_message: "Longosian Assistant sabi",
      send_button: "Ipadala",
      type_message: "I-type ang iyong mensahe...",
      chatbot_title: "Longosian - Barangay Longos Help Desk Assistant",
    },
    ceb: {
      title: "Sistema sa Pagdumala sa Barangay",
      welcome:
        "I-access ug dumala ang mga importanteng serbisyo sa barangay online. Isumite ang mga hangyo, reklamo, ug pag-update sa Barangay Longos, Dakbayan sa Malabon.",
      select_language: "Pilia ang Pinulongan",

      login_greeting: "Kumusta! Halina ug Mag-log in!",
      login_title: "Mag-log In",
      email: "Email",
      password: "Password",
      login_button: "Mag-log In",
      no_account: "Wala'y account?",
      create_account: "Paghimo og Account",
      caps_warning: "⚠️ Naka-on ang Caps Lock",

      signup_title: "Paghimo og Account",
      first_name: "Pangalan",
      last_name: "Apelyido",
      user_type: "Matang sa Gumagamit",
      select_user_type_option: "Pilia ang Matang sa Gumagamit",
      confirm_password: "Kumpirma ang Password",
      signup_button: "Mag-sign Up",
      have_account: "Aduna nay account?",
      sign_in: "Mag-sign In",

      select_service: "Pilia ang Serbisyo",
      request_document: "Hangyo og Dokumento",
      request_document_desc:
        "Pilia ang dokumento nga imong gikinahanglan, tubaga ang porma, isumite, ug kuhaa kini.",
      file_complaint: "File og Reklamo",
      file_complaint_desc:
        "Ireport ang reklamo alang sa pag-uswag sa atong komunidad.",
      other_services: "Uban pang Serbisyo",
      other_services_desc: "Isumite ang mga sugyot, feedback, o donasyon",

      my_submissions: "Akong mga Gisumite",
      track_submissions: "Sundan ang imong mga hangyo ug reklamo",
      my_requests: "Akong mga Hangyo",
      my_complaints: "Akong mga Reklamo",
      my_other_services: "Akong Uban pang Serbisyo",
      request_id: "ID sa Hangyo",
      complaint_id: "ID sa Reklamo",
      service_id: "ID sa Serbisyo",
      type: "Matang",
      date_submitted: "Petsa sa Pagsumite",
      status: "Status",
      actions: "Mga Lihok",

      request_form: "Porma sa Hangyo",
      first_name_placeholder: "Palihug isulat ang imong unang ngalan.",
      last_name_placeholder: "Palihug isulat ang imong apelyido.",
      address_placeholder: "Numero sa Balay, Dalan, Barangay, Siyudad",
      request: "Hangyo",
      select_request: "Pilia ang Hangyo",
      barangay_id: "Barangay ID",
      solo_parent_id: "Solo Parent ID",
      certificate_indigency: "Sertipiko sa Indigency",
      certificate_residency: "Sertipiko sa Residency",
      address: "Address",
      contact_number: "Numero sa Kontak",
      dob: "Petsa sa Natawhan",
      gender: "Gender",
      select_gender: "Pilia ang Gender",
      male: "Lalaki",
      female: "Babaye",
      other_gender: "Uban pa",
      submit_request: "Isumite ang Hangyo",

      complaint_form: "Porma sa Reklamo",
      complaint_type: "Matang sa Reklamo",
      select_complaint_type: "Pilia ang matang sa imong reklamo",
      noise: "Reklamo sa Kasaba",
      property: "Isyu sa Kabtangan",
      sanitation: "Kahimtang sa Kalimpyo",
      safety: "Kahimtang sa Kaluwasan",
      other_complaint: "Uban pa",
      complaint_details: "Mga Detalye sa Reklamo",
      complaint_details_placeholder:
        "Palihug isulti ang detalye sa imong reklamo.",
      submit_complaint: "Isumite ang Reklamo",

      other_services_title: "Uban pang Serbisyo",
      service_type: "Matang sa Serbisyo",
      select_service_type: "Pilia ang matang sa serbisyo",
      suggestion: "Sugyot",
      feedback: "Feedback",
      donation: "Donasyon",
      volunteer: "Boluntaryo",
      blotter: "Blotter",
      details: "Mga Detalye",
      donation_amount: "Kantidad sa Donasyon (PHP)",
      bug: "I-report ang Sayop o Problema sa Website",
      submit_service: "Isumite",

      staff_portal: "Portal sa Personnel sa Barangay",
      staff_password: "Password sa Personnel",
      authenticate: "Pamatud-an",
      staff_dashboard: "Dashboard sa Personnel sa Barangay",
      manage_submissions: "Maneho ang mga Isinumite",
      pending: "Nagahulat",
      processing: "Giproseso",
      completed: "Nahuman",
      update: "I-update",

      admin_portal: "Portal sa Admin",
      admin_password: "Password sa Admin",
      admin_dashboard: "Dashboard sa Admin",
      status_board: "Board sa Status",
      total_users: "Total nga mga Gumagamit",
      active_staff: "Aktibong Personnel",
      pending_issues: "Nagahulat nga mga Isyu",
      send_updates: "Padad-i ang mga Residente og Update",
      resident_email: "Email sa Residente",
      select_resident: "Pilia ang Residente",
      concern_type: "Matang sa Kabalaka",
      select_concern: "Pilia ang Matang sa Kabalaka",
      request_update: "Update sa Hangyo",
      complaint_update: "Update sa Reklamo",
      other_update: "Update sa Uban pang Serbisyo",
      general_announcement: "Kinatibuk-ang Pahibalo",
      subject: "Subject",
      message: "Mensahe",
      send_email: "Padad-i og Email",

      back: "Balik",
      logout: "Mag-logout",
      notifications: "Mga Pahibalo",
      no_notifications: "Walay pahibalo.",
      view: "Tan-awa",
      delete: "Papanas",
      print: "I-print",
      id: "ID",
      resident: "Residente",
      date: "Petsa",
      updated_by: "Gi-update ni",

      pending: "Naga hulat",
      processing: "Giproseso",
      completed: "Nahuman",
      typing_indicator: "Nag-type...",
      greeting_response:
        "Kumusta! Unsaon nako pagtabang nimo sa mga serbisyo sa Barangay karon?",
      services_response:
        "Naghatag ang among barangay og lain-laing serbisyo sama sa pagkuha og dokumento, pag-submit og reklamo, ug uban pang serbisyo para sa komunidad.",
      documents_response:
        "Pwede ka mangayo og dokumento sama sa Barangay ID, Certificate of Residency, o Certificate of Indigency.",
      complaints_response:
        "Para sa reklamo, gamita ang 'File a Complaint' nga serbisyo.",
      location_response:
        "Ang Barangay Longos nahimutang sa Malabon City, Pilipinas.",
      contact_response:
        "Pwede nimo tawagan ang among barangay opisina sa (02) 123-4567 sulod sa oras sa opisina.",
      default_response:
        "Pasensya, wala nako nasabtan. Pwede nimo usbon ang imong pangutana?",
      history:
        "Ang Malabon usa ka makasaysayang baybayon nga siyudad sa amihanang bahin sa Metro Manila.",
      bot_message: "Longosian Assistant miingon",
      send_button: "Ipadala",
      type_message: "I-type ang imong mensahe...",
      chatbot_title: "Longosian - Barangay Longos Help Desk Assistant",
    },
  };

  // Language direction mapping
  const languageDirections = {
    en: "ltr",
    tl: "ltr",
    ceb: "ltr",
  };

  // Current language (default to English)
  let currentLanguage = "en";

  // Helper function to translate text
  function t(key) {
    return (
      translations[currentLanguage]?.[key] || translations["en"][key] || key
    );
  }

  // Function to change language
  function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = languageDirections[lang] || "ltr";

    // Update all elements with data-i18n attributes
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      } else if (translations["en"][key]) {
        element.textContent = translations["en"][key];
      }
    });

    // Update all elements with data-i18n-placeholder attributes
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute("placeholder", translations[lang][key]);
      } else if (translations["en"][key]) {
        element.setAttribute("placeholder", translations["en"][key]);
      }
    });

    // Save language preference
    localStorage.setItem("preferredLanguage", lang);

    // Update dynamic content if needed
    if (currentUser) {
      switch (currentUser.userType) {
        case "resident":
          if (
            residentContainer &&
            residentContainer.style.display === "block"
          ) {
            loadResidentTracking();
          }
          break;
        case "staff":
          if (staffDashboard && staffDashboard.style.display === "block") {
            loadStaffDashboard();
          }
          break;
        case "admin":
          if (adminDashboard && adminDashboard.style.display === "block") {
            loadAdminDashboard();
          }
          break;
      }
    }
  }

  // Initialize language on page load
  function initializeLanguage() {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage = savedLanguage;
      const languageSelector = document.getElementById("language-select");
      if (languageSelector) languageSelector.value = savedLanguage;
    }

    changeLanguage(currentLanguage);
  }

  // Language selector event listener
  document
    .getElementById("language-select")
    ?.addEventListener("change", function () {
      changeLanguage(this.value);
    });

  // Initialize language
  initializeLanguage();

  // Utility function to hide all containers
  function hideAllContainers() {
    containers.forEach((container) => {
      if (container) container.style.display = "none";
    });
    if (notifIcon) notifIcon.style.display = "none";
  }

  // Chatbot functionality
  const chatbotContainer = document.querySelector(".chatbot-container");
  const chatbotIcon = document.querySelector(".chatbot-icon");
  const chatbotWindow = document.querySelector(".chatbot-window");
  const closeChatbot = document.querySelector(".close-chatbot");
  const sendButton = document.querySelector(".send-button");
  const chatInput = document.querySelector(".chatbot-input input");
  const chatMessages = document.querySelector(".chatbot-messages");

  // Make chatbot icon draggable
  let isDragging = false;
  let offsetX, offsetY;
  let initialX = window.innerWidth - 150;
  let initialY = window.innerHeight - 150;

  // Set initial position
  if (chatbotContainer) {
    chatbotContainer.style.position = "fixed";
    chatbotContainer.style.right = "20px";
    chatbotContainer.style.bottom = "20px";
    chatbotContainer.style.zIndex = "1000";
  }

  // Function to ensure chatbot stays within viewport bounds
  function constrainChatbotPosition() {
    if (!chatbotContainer) return;

    const rect = chatbotContainer.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let newX =
      parseInt(chatbotContainer.style.left) || windowWidth - rect.width - 20;
    let newY =
      parseInt(chatbotContainer.style.top) || windowHeight - rect.height - 20;

    if (newX < 0) newX = 0;
    if (newX + rect.width > windowWidth) newX = windowWidth - rect.width;
    if (newY < 0) newY = 0;
    if (newY + rect.height > windowHeight) newY = windowHeight - rect.height;

    chatbotContainer.style.left = newX + "px";
    chatbotContainer.style.top = newY + "px";
    chatbotContainer.style.right = "auto";
    chatbotContainer.style.bottom = "auto";
  }

  // Initialize chatbot position
  function initializeChatbotPosition() {
    if (!chatbotContainer) return;

    const rect = chatbotContainer.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let startX = initialX;
    let startY = initialY;

    if (startX + rect.width > windowWidth)
      startX = windowWidth - rect.width - 20;
    if (startY + rect.height > windowHeight)
      startY = windowHeight - rect.height - 20;

    chatbotContainer.style.right = "auto";
    chatbotContainer.style.bottom = "auto";
    chatbotContainer.style.left = startX + "px";
    chatbotContainer.style.top = startY + "px";
  }

  initializeChatbotPosition();

  if (chatbotIcon) {
    chatbotIcon.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = chatbotContainer.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      chatbotIcon.style.cursor = "grabbing";
      e.preventDefault();
    });
  }

  document.addEventListener("mousemove", (e) => {
    if (!isDragging || !chatbotContainer) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    chatbotContainer.style.left = newX + "px";
    chatbotContainer.style.top = newY + "px";
    chatbotContainer.style.right = "auto";
    chatbotContainer.style.bottom = "auto";

    constrainChatbotPosition();
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    if (chatbotIcon) chatbotIcon.style.cursor = "pointer";
  });

  // Toggle chatbot window
  if (chatbotIcon) {
    chatbotIcon.addEventListener("click", (e) => {
      if (!isDragging && chatbotWindow) {
        chatbotWindow.style.display =
          chatbotWindow.style.display === "flex" ? "none" : "flex";
        if (chatbotWindow.style.display === "flex") {
          constrainChatbotPosition();
        }
      }
    });
  }

  // Close chatbot window
  if (closeChatbot) {
    closeChatbot.addEventListener("click", () => {
      if (chatbotWindow) chatbotWindow.style.display = "none";
    });
  }

  // Send message functionality
  function sendMessage() {
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();
    if (message === "") return;

    // Add user message
    addMessage(message, "user");
    chatInput.value = "";

    // Simulate typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chatbot-message bot-message";
    typingIndicator.innerHTML = `
      <img src="images/hi.png" alt="Bot Avatar" class="bot-avatar">
      <div class="message-bubble">
        <p>${t("typing_indicator")}</p>
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate bot response after a short delay
    setTimeout(() => {
      chatMessages.removeChild(typingIndicator);
      const response = getBotResponse(message);
      addMessage(response, "bot");
    }, 1000);
  }

  // Add message to chat
  function addMessage(text, sender) {
    if (!chatMessages) return;

    const messageDiv = document.createElement("div");
    messageDiv.className = `chatbot-message ${sender}-message`;

    if (sender === "bot") {
      messageDiv.innerHTML = `
        <img src="images/hi.png" alt="Bot Avatar" class="bot-avatar">
        <div class="message-bubble">
          <p>${text}</p>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-bubble">
          <p><strong>${t("you")}:</strong> ${text}</p>
        </div>
      `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Simple bot responses
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hey") ||
      lowerMessage.includes("hi")
    ) {
      return t("greeting_response");
    }

    if (
      lowerMessage.includes("service") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("support")
    ) {
      return t("services_response");
    }

    if (
      lowerMessage.includes("document") ||
      lowerMessage.includes("certificate") ||
      lowerMessage.includes("id")
    ) {
      return t("documents_response");
    }

    if (
      lowerMessage.includes("complaint") ||
      lowerMessage.includes("problem") ||
      lowerMessage.includes("issue")
    ) {
      return t("complaints_response");
    }

    if (
      lowerMessage.includes("where") ||
      lowerMessage.includes("location") ||
      lowerMessage.includes("address")
    ) {
      return t("location_response");
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("number") ||
      lowerMessage.includes("call")
    ) {
      return t("contact_response");
    }

    if (lowerMessage.includes("history") || lowerMessage.includes("about")) {
      return t("history");
    }

    return t("default_response");
  }

  // Send message on button click or Enter key
  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Adjust chatbot position on window resize
  window.addEventListener("resize", () => {
    constrainChatbotPosition();
  });

  // Toggle between split-screen and full-screen views
  function showSplitScreen() {
    if (splitScreenContainer) splitScreenContainer.style.display = "block";
    if (fullScreenContainer) fullScreenContainer.style.display = "none";
    if (statusBar) statusBar.style.display = "none";
  }

  function showFullScreen() {
    if (splitScreenContainer) splitScreenContainer.style.display = "none";
    if (fullScreenContainer) fullScreenContainer.style.display = "block";
    if (statusBar) statusBar.style.display = "block";
  }

  // Toggle password visibility
  function togglePasswordVisibility(inputId, toggleBtn) {
    const input = document.getElementById(inputId);
    if (!input || !toggleBtn) return;

    if (input.type === "password") {
      input.type = "text";
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6c-3.95 0-7.2 2.3-9 6 1.8 3.7 5.05 6 9 6s7.2-2.3 9-6c-1.8-3.7-5.05-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5A2.5 2.5 0 0 0 9.5 12 2.5 2.5 0 0 0 12 14.5 2.5 2.5 0 0 0 14.5 12 2.5 2.5 0 0 0 12 9.5z"/>
        </svg>
      `;
    } else {
      input.type = "password";
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6c-3.95 0-7.2 2.3-9 6 1.8 3.7 5.05 6 9 6s7.2-2.3 9-6c-1.8-3.7-5.05-6-9-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5A2.5 2.5 0 0 0 9.5 12 2.5 2.5 0 0 0 12 14.5 2.5 2.5 0 0 0 14.5 12 2.5 2.5 0 0 0 12 9.5z"/>
          <path d="M22 2L2 22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    }
  }

  // Initialize - show login form first
  hideAllContainers();
  showSplitScreen();
  if (loginContainer) loginContainer.style.display = "block";

  // Tab switching for resident tracking
  document.querySelectorAll(".tracking-tabs .tab-btn").forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Update active tab button
      document.querySelectorAll(".tracking-tabs .tab-btn").forEach((b) => {
        if (b) b.classList.remove("active");
      });
      this.classList.add("active");

      // Update active tab content
      document
        .querySelectorAll(".tracking-content .tab-content")
        .forEach((content) => {
          if (content) content.classList.remove("active");
        });
      const tabContent = document.getElementById(`${tabId}-tab`);
      if (tabContent) tabContent.classList.add("active");
    });
  });

  // Logout functionality
  document.querySelectorAll(".logout-btn").forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", function () {
      currentUser = null;
      localStorage.removeItem("loggedInResident");
      hideAllContainers();
      loadLoginSignupPage();
    });
  });

  // Back button functionality
  document.querySelectorAll("#back-btn").forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("click", function () {
      hideAllContainers();

      if (currentUser) {
        switch (currentUser.userType) {
          case "resident":
            if (residentContainer) residentContainer.style.display = "block";
            break;
          case "staff":
            if (staffContainer) staffContainer.style.display = "block";
            break;
          case "admin":
            if (adminContainer) adminContainer.style.display = "block";
            break;
          default:
            if (loginContainer) loginContainer.style.display = "block";
        }
      } else {
        showSplitScreen();
        if (loginContainer) loginContainer.style.display = "block";
      }
    });
  });

  // Other Services Handling Functions
  function handleOtherServicesSubmit(e) {
    e.preventDefault();
    try {
      const currentUser = getCurrentUser();
      if (!currentUser || currentUser.userType !== "resident") {
        throw new Error(t("only_residents_can_submit"));
      }

      const formData = collectOtherServicesFormData();
      validateOtherServicesForm(formData);

      const newService = createOtherService(formData, currentUser);
      otherServices.push(newService);
      localStorage.setItem("otherServices", JSON.stringify(otherServices));

      updateServicesTable();
      updateManageServicesTable();
      if (otherServicesForm) otherServicesForm.reset();
      if (donationAmountGroup) donationAmountGroup.style.display = "none";

      console.log("Service submitted:", newService.id);
      alert(t("service_submitted"));
    } catch (error) {
      console.error("Service submission error:", error.message);
      alert(error.message);
    }
  }

  function collectOtherServicesFormData() {
    return {
      serviceType: document.getElementById("serviceType")?.value,
      details: document.getElementById("serviceDetails")?.value.trim(),
      donationAmount: document.getElementById("donationAmount")?.value,
    };
  }

  function validateOtherServicesForm(formData) {
    if (!formData.serviceType || !formData.details) {
      throw new Error(t("fill_required_fields"));
    }

    if (
      formData.serviceType === "Donation" &&
      (!formData.donationAmount || formData.donationAmount <= 0)
    ) {
      throw new Error(t("valid_donation_amount"));
    }
  }

  function createOtherService(formData, currentUser) {
    return {
      id: "SRV-" + Date.now(),
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      serviceType: formData.serviceType,
      details: formData.details,
      donationAmount:
        formData.serviceType === "Donation"
          ? parseFloat(formData.donationAmount)
          : null,
      date: new Date().toISOString(),
      status: "Received",
      verifiedBy: "",
      verifiedAt: "",
      createdBy: currentUser.email,
      isVerified: false,
    };
  }

  function updateServicesTable() {
    const currentUser = getCurrentUser();
    if (!currentUser || !servicesList) return;

    const typeFilterValue = serviceTypeFilter ? serviceTypeFilter.value : "all";
    let filteredServices = otherServices.filter(
      (s) => s.createdBy === currentUser.email
    );

    if (typeFilterValue !== "all") {
      filteredServices = filteredServices.filter(
        (s) => s.serviceType === typeFilterValue
      );
    }

    servicesList.innerHTML = filteredServices
      .map(
        (service) => `
        <tr>
          <td>${service.id}</td>
          <td>${
            t(service.serviceType.toLowerCase()) || service.serviceType
          }</td>
          <td>${new Date(service.date).toLocaleDateString()}</td>
          <td class="status-${service.status.toLowerCase()}">${
          t(service.status.toLowerCase()) || service.status
        }</td>
          <td>${service.details.substring(0, 30)}${
          service.details.length > 30 ? "..." : ""
        }</td>
          <td>
            <button class="action-btn view-btn" data-id="${
              service.id
            }" data-type="others"><img src="images/view.png" alt="${t(
          "view"
        )}" style="width: 25px; height: auto;"></button>
          </td>
        </tr>
      `
      )
      .join("");

    // Add event listeners to view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const itemType = this.getAttribute("data-type");
        showDetailsModal(itemId, itemType);
      });
    });
  }

  function updateManageServicesTable() {
    // Implementation would be similar to updateServicesTable but with more columns/actions
  }

  function getCurrentUser() {
    return currentUser;
  }

  // Load resident tracking data
  function loadResidentTracking() {
    if (!currentUser) return;

    // Filter for current user's submissions
    const userRequests = requests.filter(
      (req) => req.email === currentUser.email
    );
    const userComplaints = complaints.filter(
      (comp) => comp.email === currentUser.email
    );
    const userOtherServices = otherServices.filter(
      (service) => service.createdBy === currentUser.email
    );

    // Populate requests table
    const requestsList = document.getElementById("requests-list");
    if (requestsList) {
      requestsList.innerHTML = userRequests
        .map(
          (req) => `
        <tr>
          <td>${req.id}</td>
          <td>${t(req.type.toLowerCase()) || req.type}</td>
          <td>${new Date(req.date).toLocaleDateString()}</td>
          <td class="status-${req.status}">${
            t(req.status.toLowerCase()) || req.status
          }</td>
          <td>
            <button class="action-btn view-btn" data-id="${
              req.id
            }" data-type="request"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
          </td>
        </tr>
      `
        )
        .join("");
    }

    // Populate complaints table
    const complaintsList = document.getElementById("complaints-list");
    if (complaintsList) {
      complaintsList.innerHTML = userComplaints
        .map(
          (comp) => `
        <tr>
          <td>${comp.id}</td>
          <td>${t(comp.type.toLowerCase()) || comp.type}</td>
          <td>${new Date(comp.date).toLocaleDateString()}</td>
          <td class="status-${comp.status}">${
            t(comp.status.toLowerCase()) || comp.status
          }</td>
          <td>
            <button class="action-btn view-btn" data-id="${
              comp.id
            }" data-type="complaint"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
          </td>
        </tr>
      `
        )
        .join("");
    }

    // Populate other services table
    const othersList = document.getElementById("others-list");
    if (othersList) {
      othersList.innerHTML = userOtherServices
        .map(
          (service) => `
        <tr>
          <td>${service.id}</td>
          <td>${
            t(service.serviceType.toLowerCase()) || service.serviceType
          }</td>
          <td>${new Date(service.date).toLocaleDateString()}</td>
          <td class="status-${service.status.toLowerCase()}">${
            t(service.status.toLowerCase()) || service.status
          }</td>
          <td>
            <button class="action-btn view-btn" data-id="${
              service.id
            }" data-type="others"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
          </td>
        </tr>
      `
        )
        .join("");
    }

    // Add event listeners to view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const itemType = this.getAttribute("data-type");
        showDetailsModal(itemId, itemType);
      });
    });
  }

  // Show details in modal
  function showDetailsModal(itemId, itemType) {
    let item;
    let collection;

    switch (itemType) {
      case "request":
        collection = requests;
        item = requests.find((r) => r.id === itemId);
        break;
      case "complaint":
        collection = complaints;
        item = complaints.find((c) => c.id === itemId);
        break;
      case "others":
        collection = otherServices;
        item = otherServices.find((s) => s.id === itemId);
        break;
      default:
        alert(t("invalid_item_type"));
        return;
    }

    if (!item) {
      alert(t("item_not_found"));
      return;
    }

    // Create modal
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "details-modal";

    // Get translated status
    const statusText = t(item.status.toLowerCase()) || item.status;

    // Modal content
    const modalContent = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${t(
            itemType === "request"
              ? "request"
              : itemType === "complaint"
              ? "complaint"
              : "other_service"
          )} ${t("details")}</h2>
          <span class="close-btn">&times;</span>
        </div>
        <div class="modal-body">
          <div class="item-details">
            <p><strong>${t("id")}:</strong> ${item.id}</p>
            <p><strong>${t(
              "status"
            )}:</strong> <span class="status-${item.status.toLowerCase()}">${statusText}</span></p>
            <p><strong>${t("date_submitted")}:</strong> ${new Date(
      item.date
    ).toLocaleDateString()}</p>
            ${getItemSpecificDetails(item, itemType)}
          </div>
        </div>
        <div class="modal-footer">
          ${
            currentUser?.userType === "admin" ||
            currentUser?.userType === "staff"
              ? `<button class="btn print-btn" data-id="${itemId}" data-type="${itemType}">${t(
                  "print"
                )}</button>`
              : ""
          }
          ${
            currentUser?.userType === "staff"
              ? `<button class="btn delete-btn" data-id="${itemId}" data-type="${itemType}"><img src="images/delete.png" alt="${t(
                  "delete"
                )}" style="width: auto; height: 16px;"></button>`
              : ""
          }
        </div>
      </div>
    `;
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Close modal when clicking X
    modal.querySelector(".close-btn")?.addEventListener("click", function () {
      modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.remove();
      }
    });

    // Print button handler
    modal.querySelector(".print-btn")?.addEventListener("click", function () {
      printItemDetails(item, itemType);
    });

    // Delete button handler (staff only)
    modal.querySelector(".delete-btn")?.addEventListener("click", function () {
      if (confirm(t("confirm_delete"))) {
        const index = collection.findIndex((i) => i.id === itemId);
        if (index !== -1) {
          collection.splice(index, 1);
          localStorage.setItem(
            `${itemType === "others" ? "otherServices" : itemType + "s"}`,
            JSON.stringify(collection)
          );

          // Update the appropriate collection variable
          if (itemType === "request") {
            requests = collection;
          } else if (itemType === "complaint") {
            complaints = collection;
          } else if (itemType === "others") {
            otherServices = collection;
          }

          // Reload the appropriate view
          if (
            trackingContainer &&
            trackingContainer.style.display === "block"
          ) {
            loadResidentTracking();
          } else if (
            staffDashboard &&
            staffDashboard.style.display === "block"
          ) {
            loadStaffDashboard();
          }

          // Close modal
          modal.remove();
          alert(t("item_deleted"));
        }
      }
    });

    // Show modal
    modal.style.display = "block";
  }

  // Helper function to get item-specific details
  function getItemSpecificDetails(item, itemType) {
    let details = "";

    if (itemType === "request") {
      details = `
        <p><strong>${t("type")}:</strong> ${
        t(item.type.toLowerCase()) || item.type
      }</p>
        <p><strong>${t("first_name")}:</strong> ${item.firstName}</p>
        <p><strong>${t("last_name")}:</strong> ${item.lastName}</p>
        <p><strong>${t("address")}:</strong> ${item.address}</p>
        <p><strong>${t("contact_number")}:</strong> ${item.contactNumber}</p>
        <p><strong>${t("dob")}:</strong> ${item.dob}</p>
        <p><strong>${t("gender")}:</strong> ${
        t(item.gender.toLowerCase()) || item.gender
      }</p>
      `;
    } else if (itemType === "complaint") {
      details = `
        <p><strong>${t("type")}:</strong> ${
        t(item.type.toLowerCase()) || item.type
      }</p>
        <p><strong>${t("first_name")}:</strong> ${item.firstName}</p>
        <p><strong>${t("last_name")}:</strong> ${item.lastName}</p>
        <p><strong>${t("address")}:</strong> ${item.address}</p>
        <p><strong>${t("contact_number")}:</strong> ${item.contactNumber}</p>
        <p><strong>${t("complaint_details")}:</strong> ${item.details}</p>
      `;
    } else if (itemType === "others") {
      details = `
        <p><strong>${t("service_type")}:</strong> ${
        t(item.serviceType.toLowerCase()) || item.serviceType
      }</p>
        <p><strong>${t("first_name")}:</strong> ${item.firstName}</p>
        <p><strong>${t("last_name")}:</strong> ${item.lastName}</p>
        <p><strong>${t("details")}:</strong> ${item.details}</p>
        ${
          item.serviceType === "Donation"
            ? `<p><strong>${t("donation_amount")}:</strong> PHP ${
                item.donationAmount
              }</p>`
            : ""
        }
      `;
    }

    return details;
  }

  // Print item details with the new template
  function printItemDetails(item, itemType) {
    const printWindow = window.open("", "_blank");
    const currentDate = new Date().toLocaleDateString();

    // Get translated values
    const statusText = t(item.status.toLowerCase()) || item.status;
    const typeText = t(
      itemType === "request"
        ? "request"
        : itemType === "complaint"
        ? "complaint"
        : "other_service"
    );
    const itemTypeText = item.type
      ? t(item.type.toLowerCase()) || item.type
      : item.serviceType
      ? t(item.serviceType.toLowerCase()) || item.serviceType
      : "";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${currentLanguage}">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${t("title")}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: white;
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
              }
              .container {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header-flex {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 20px;
                  flex-wrap: wrap;
              }
              .title {
                  text-align: center;
              }
              h1 {
                  font-size: 2em;
                  margin: 0;
              }
              h2 {
                  font-size: 1.2em;
                  margin: 5px 0 0;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  background-color: white;
                  border: 1px solid #ccc;
                  margin: 20px 0;
              }
              th {
                  background-color: #9c27b0 !important;
                  color: white !important;
                  padding: 10px;
                  -webkit-print-color-adjust: exact;
              }
              td {
                  border: 1px solid #ccc;
                  padding: 10px;
                  text-align: center;
              }
              .status-badge {
                  padding: 3px 8px;
                  border-radius: 3px;
                  font-weight: bold;
                  display: inline-block;
              }
              .status-pending { background-color: #CD3531 !important; color: black !important; -webkit-print-color-adjust: exact; }
              .status-received { background-color: #17a2b8 !important; color: white !important; -webkit-print-color-adjust: exact; }
              .status-processing { background-color: #FFD524 !important; color: white !important; -webkit-print-color-adjust: exact; }
              .status-completed { background-color: #026F00 !important; color: white !important; -webkit-print-color-adjust: exact; }
              .footer {
                  margin-top: 20px;
                  text-align: right;
                  font-style: italic;
                  color: #666;
              }
              @media print {
                  body {
                      background-color: white !important;
                  }
                  th {
                      background-color: #b740fa !important;
                      color: white !important;
                  }
                  .status-pending, .status-received, .status-processing, .status-completed {
                      -webkit-print-color-adjust: exact !important;
                      print-color-adjust: exact !important;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header-flex">
                  <img src="images/Logo.png" alt="Barangay Longos Logo" class="logo" width="50" height="50">
                  <div class="title">
                      <h1>${t("title")}</h1>
                      <h2>${t("resident")} ${typeText} ${t("details")}</h2>
                  </div>
                  <img src="images/malabon.png" alt="Barangay Longos Logo" class="logo" width="50" height="50">
              </div>
          </div>
          <table>
              <thead>
                  <tr>
                      <th>${t("status")}</th>
                      <th>${t("reference_id")}</th>
                      <th>${t("resident_name")}</th>
                      <th>${t("address")}</th>
                      <th>${t("contact_number")}</th>
                      <th>${t("service_type")}</th>
                      <th>${t("date_submitted")}</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td><span class="status-badge status-${item.status.toLowerCase()}">${statusText}</span></td>
                      <td>${item.id}</td>
                      <td>${item.firstName} ${item.lastName}</td>
                      <td>${item.address || "N/A"}</td>
                      <td>${item.contactNumber || "N/A"}</td>
                      <td>${itemTypeText}</td>
                      <td>${new Date(item.date).toLocaleDateString()}</td>
                  </tr>
              </tbody>
          </table>
          <script>
              setTimeout(function() {
                  window.print();
                  window.close();
              }, 500);
          </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  // Submit request function
  function submitRequest() {
    const requestData = {
      id: "REQ-" + Date.now(),
      email: currentUser.email,
      type: document.getElementById("request")?.value,
      firstName: document.getElementById("first-name-req")?.value,
      lastName: document.getElementById("last-name-req")?.value,
      address: document.getElementById("address")?.value,
      contactNumber: document.getElementById("contact-number")?.value,
      dob: document.getElementById("dob")?.value,
      gender: document.getElementById("gender")?.value,
      date: new Date().toISOString(),
      status: "pending",
    };

    requests.push(requestData);
    localStorage.setItem("requests", JSON.stringify(requests));
    alert(t("request_submitted"));

    hideAllContainers();
    if (residentContainer) residentContainer.style.display = "block";
  }

  // Submit complaint function
  function submitComplaint() {
    const complaintData = {
      id: "COMP-" + Date.now(),
      email: currentUser.email,
      type: document.getElementById("complaint-type")?.value,
      firstName: document.getElementById("first-name-comp")?.value,
      lastName: document.getElementById("last-name-comp")?.value,
      address: document.getElementById("address-comp")?.value,
      contactNumber: document.getElementById("contact-number")?.value,
      details: document.getElementById("complaint-details")?.value,
      date: new Date().toISOString(),
      status: "pending",
    };

    complaints.push(complaintData);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    alert(t("complaint_submitted"));

    hideAllContainers();
    if (residentContainer) residentContainer.style.display = "block";
  }

  // Load staff dashboard function
  function loadStaffDashboard() {
    // Get all submissions
    requests = JSON.parse(localStorage.getItem("requests")) || [];
    complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    otherServices = JSON.parse(localStorage.getItem("otherServices")) || [];
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Update counts
    const pendingCount = document.getElementById("pending-count");
    if (pendingCount) {
      pendingCount.textContent =
        requests.filter((r) => r.status === "pending").length +
        complaints.filter((c) => c.status === "pending").length +
        otherServices.filter((s) => s.status === "Received").length;
    }

    const processingCount = document.getElementById("processing-count");
    if (processingCount) {
      processingCount.textContent =
        requests.filter((r) => r.status === "processing").length +
        complaints.filter((c) => c.status === "processing").length +
        otherServices.filter((s) => s.status === "Processing").length;
    }

    const completedCount = document.getElementById("completed-count");
    if (completedCount) {
      completedCount.textContent =
        requests.filter((r) => r.status === "completed").length +
        complaints.filter((c) => c.status === "completed").length +
        otherServices.filter((s) => s.status === "Completed").length;
    }

    // Populate requests table with translated content
    const requestsList = document.getElementById("staff-requests-list");
    if (requestsList) {
      requestsList.innerHTML = requests
        .map((req) => {
          const user = allUsers.find((u) => u.email === req.email) || {};
          const statusText = t(req.status.toLowerCase()) || req.status;
          const typeText = t(req.type.toLowerCase()) || req.type;

          return `
        <tr>
          <td>${req.id}</td>
          <td>${user.firstName || ""} ${user.lastName || ""}</td>
          <td>${typeText}</td>
          <td>${new Date(req.date).toLocaleDateString()}</td>
          <td class="status-${req.status}">${statusText}</td>
          <td>
            <select class="status-select" data-type="request" data-id="${
              req.id
            }">
              <option value="pending" ${
                req.status === "pending" ? "selected" : ""
              }>${t("pending")}</option>
              <option value="processing" ${
                req.status === "processing" ? "selected" : ""
              }>${t("processing")}</option>
              <option value="completed" ${
                req.status === "completed" ? "selected" : ""
              }>${t("completed")}</option>
            </select>
          </td>
          <td>
            <button class="update-btn" data-type="request" data-id="${
              req.id
            }"><img src="images/update.png" alt="${t(
            "update"
          )}" style="width: 22px; height: auto;"></button>
            <button class="view-btn" data-type="request" data-id="${
              req.id
            }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
            <button class="delete-btn" data-type="request" data-id="${
              req.id
            }"><img src="images/delete.png" alt="${t(
            "delete"
          )}" style="width: auto; height: 16px;"></button>
          </td>
        </tr>
      `;
        })
        .join("");
    }

    // Populate complaints table with translated content
    const complaintsList = document.getElementById("staff-complaints-list");
    if (complaintsList) {
      complaintsList.innerHTML = complaints
        .map((comp) => {
          const user = allUsers.find((u) => u.email === comp.email) || {};
          const statusText = t(comp.status.toLowerCase()) || comp.status;
          const typeText = t(comp.type.toLowerCase()) || comp.type;

          return `
        <tr>
          <td>${comp.id}</td>
          <td>${user.firstName || ""} ${user.lastName || ""}</td>
          <td>${typeText}</td>
          <td>${new Date(comp.date).toLocaleDateString()}</td>
          <td class="status-${comp.status}">${statusText}</td>
          <td>
            <select class="status-select" data-type="complaint" data-id="${
              comp.id
            }">
              <option value="pending" ${
                comp.status === "pending" ? "selected" : ""
              }>${t("pending")}</option>
              <option value="processing" ${
                comp.status === "processing" ? "selected" : ""
              }>${t("processing")}</option>
              <option value="completed" ${
                comp.status === "completed" ? "selected" : ""
              }>${t("completed")}</option>
            </select>
          </td>
          <td>
            <button class="update-btn" data-type="complaint" data-id="${
              comp.id
            }"><img src="images/update.png" alt="${t(
            "update"
          )}" style="width: 22px; height: auto;"></button>
            <button class="view-btn" data-type="complaint" data-id="${
              comp.id
            }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
            <button class="delete-btn" data-type="complaint" data-id="${
              comp.id
            }"><img src="images/delete.png" alt="${t(
            "delete"
          )}" style="width: auto; height: 16px;"></button>
          </td>
        </tr>
      `;
        })
        .join("");
    }

    // Populate other services table with translated content
    const othersList = document.getElementById("staff-others-list");
    if (othersList) {
      othersList.innerHTML = otherServices
        .map((service) => {
          const user =
            allUsers.find((u) => u.email === service.createdBy) || {};
          const statusText = t(service.status.toLowerCase()) || service.status;
          const typeText =
            t(service.serviceType.toLowerCase()) || service.serviceType;

          return `
        <tr>
          <td>${service.id}</td>
          <td>${user.firstName || ""} ${user.lastName || ""}</td>
          <td>${typeText}</td>
          <td>${new Date(service.date).toLocaleDateString()}</td>
          <td class="status-${service.status.toLowerCase()}">${statusText}</td>
          <td>
            <select class="status-select" data-type="others" data-id="${
              service.id
            }">
              <option value="Received" ${
                service.status === "Received" ? "selected" : ""
              }>${t("received")}</option>
              <option value="Processing" ${
                service.status === "Processing" ? "selected" : ""
              }>${t("processing")}</option>
              <option value="Completed" ${
                service.status === "Completed" ? "selected" : ""
              }>${t("completed")}</option>
            </select>
          </td>
          <td>
            <button class="update-btn" data-type="others" data-id="${
              service.id
            }"><img src="images/update.png" alt="${t(
            "update"
          )}" style="width: 22px; height: auto;"></button>
            <button class="view-btn" data-type="others" data-id="${
              service.id
            }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
            <button class="delete-btn" data-type="others" data-id="${
              service.id
            }"><img src="images/delete.png" alt="${t(
            "delete"
          )}" style="width: auto; height: 16px;"></button>
          </td>
        </tr>
      `;
        })
        .join("");
    }

    // Set up tab switching for staff dashboard
    document.querySelectorAll(".submission-tabs .tab-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Update active tab button
        document.querySelectorAll(".submission-tabs .tab-btn").forEach((b) => {
          if (b) b.classList.remove("active");
        });
        this.classList.add("active");

        // Update active tab content
        document
          .querySelectorAll(".submission-content .tab-content")
          .forEach((content) => {
            if (content) content.classList.remove("active");
          });
        const tabContent = document.getElementById(`${tabId}-tab-staff`);
        if (tabContent) tabContent.classList.add("active");
      });
    });

    // Add event listeners to view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const itemType = this.getAttribute("data-type");
        showDetailsModal(itemId, itemType);
      });
    });

    // Add event listeners to update buttons
    document.querySelectorAll(".update-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const type = this.getAttribute("data-type");
        const id = this.getAttribute("data-id");
        const select = document.querySelector(
          `.status-select[data-type="${type}"][data-id="${id}"]`
        );
        if (!select) return;

        const newStatus = select.value;

        // Update in localStorage
        let items;
        if (type === "request") {
          items = requests;
        } else if (type === "complaint") {
          items = complaints;
        } else if (type === "others") {
          items = otherServices;
        }

        const itemIndex = items.findIndex((item) => item.id === id);
        if (itemIndex !== -1) {
          items[itemIndex].status = newStatus;
          items[itemIndex].updatedBy = currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : "Staff";

          // Save back to localStorage
          if (type === "request") {
            localStorage.setItem("requests", JSON.stringify(items));
          } else if (type === "complaint") {
            localStorage.setItem("complaints", JSON.stringify(items));
          } else if (type === "others") {
            localStorage.setItem("otherServices", JSON.stringify(items));
          }

          alert(t("status_updated"));
          loadStaffDashboard();
        }
      });
    });

    // Add event listeners to delete buttons in the staff dashboard tables
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const itemType = this.getAttribute("data-type");

        if (confirm(t("confirm_delete"))) {
          let collection;
          if (itemType === "request") {
            collection = requests;
          } else if (itemType === "complaint") {
            collection = complaints;
          } else if (itemType === "others") {
            collection = otherServices;
          }

          const index = collection.findIndex((i) => i.id === itemId);
          if (index !== -1) {
            collection.splice(index, 1);
            localStorage.setItem(
              `${itemType === "others" ? "otherServices" : itemType + "s"}`,
              JSON.stringify(collection)
            );

            // Update the appropriate collection variable
            if (itemType === "request") {
              requests = collection;
            } else if (itemType === "complaint") {
              complaints = collection;
            } else if (itemType === "others") {
              otherServices = collection;
            }

            // Reload the staff dashboard
            loadStaffDashboard();
            alert(t("item_deleted"));
          }
        }
      });
    });
  }

  // Load admin dashboard
  function loadAdminDashboard() {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    requests = JSON.parse(localStorage.getItem("requests")) || [];
    complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    otherServices = JSON.parse(localStorage.getItem("otherServices")) || [];

    // Update counts
    const totalUsers = document.getElementById("total-users");
    if (totalUsers) totalUsers.textContent = allUsers.length;

    const activeStaff = document.getElementById("active-staff");
    if (activeStaff) {
      activeStaff.textContent = allUsers.filter(
        (u) => u.userType === "staff"
      ).length;
    }

    const pendingIssues = document.getElementById("pending-issues");
    if (pendingIssues) {
      pendingIssues.textContent =
        requests.filter((r) => r.status === "pending").length +
        complaints.filter((c) => c.status === "pending").length +
        otherServices.filter((s) => s.status === "Received").length;
    }

    // Populate resident email dropdown
    const residentEmailSelect = document.getElementById("resident-email");
    if (residentEmailSelect) {
      residentEmailSelect.innerHTML =
        `<option value="">${t("select_resident")}</option>` +
        allUsers
          .filter((u) => u.userType === "resident")
          .map(
            (user) =>
              `<option value="${user.email}">${user.firstName} ${user.lastName} (${user.email})</option>`
          )
          .join("");
    }

    // Load status board
    loadAdminStatusBoard();

    // Admin navigation button handlers
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const page = this.getAttribute("data-page");

        // Update active button
        document.querySelectorAll(".nav-btn").forEach((b) => {
          if (b) b.classList.remove("active");
        });
        this.classList.add("active");

        // Show the correct page
        const adminActions = document.querySelector(".admin-actions");
        const statusBoard = document.getElementById("admin-status-board");

        if (page === "dashboard") {
          if (adminActions) adminActions.style.display = "block";
          if (statusBoard) statusBoard.style.display = "none";
        } else {
          if (adminActions) adminActions.style.display = "none";
          if (statusBoard) statusBoard.style.display = "block";
          loadAdminStatusBoard();
        }
      });
    });

    // Tab switching for admin status board
    document.querySelectorAll("#admin-status-board .tab-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Update active tab button
        document
          .querySelectorAll("#admin-status-board .tab-btn")
          .forEach((b) => {
            if (b) b.classList.remove("active");
          });
        this.classList.add("active");

        // Update active tab content
        document
          .querySelectorAll("#admin-status-board .tab-content")
          .forEach((content) => {
            if (content) content.classList.remove("active");
          });
        const tabContent = document.getElementById(`${tabId}-tab-admin`);
        if (tabContent) tabContent.classList.add("active");
      });
    });
  }

  // Load admin status board function
  function loadAdminStatusBoard() {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    requests = JSON.parse(localStorage.getItem("requests")) || [];
    complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    otherServices = JSON.parse(localStorage.getItem("otherServices")) || [];

    // Populate requests table with translated content
    const requestsList = document.getElementById("admin-requests-list");
    if (requestsList) {
      requestsList.innerHTML = requests
        .map((req) => {
          const user = allUsers.find((u) => u.email === req.email) || {};
          const statusText = t(req.status.toLowerCase()) || req.status;
          const typeText = t(req.type.toLowerCase()) || req.type;

          return `
            <tr>
              <td>${req.id}</td>
              <td>${user.firstName || ""} ${user.lastName || ""}</td>
              <td>${typeText}</td>
              <td>${new Date(req.date).toLocaleDateString()}</td>
              <td class="status-${req.status}">${statusText}</td>
              <td>${req.updatedBy || "N/A"}</td>
              <td>
                <button class="view-btn" data-type="request" data-id="${
                  req.id
                }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
              </td>
            </tr>
          `;
        })
        .join("");
    }

    // Populate complaints table with translated content
    const complaintsList = document.getElementById("admin-complaints-list");
    if (complaintsList) {
      complaintsList.innerHTML = complaints
        .map((comp) => {
          const user = allUsers.find((u) => u.email === comp.email) || {};
          const statusText = t(comp.status.toLowerCase()) || comp.status;
          const typeText = t(comp.type.toLowerCase()) || comp.type;

          return `
            <tr>
              <td>${comp.id}</td>
              <td>${user.firstName || ""} ${user.lastName || ""}</td>
              <td>${typeText}</td>
              <td>${new Date(comp.date).toLocaleDateString()}</td>
              <td class="status-${comp.status}">${statusText}</td>
              <td>${comp.updatedBy || "N/A"}</td>
              <td>
                <button class="view-btn" data-type="complaint" data-id="${
                  comp.id
                }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
              </td>
            </tr>
          `;
        })
        .join("");
    }

    // Populate other services table with translated content
    const othersList = document.getElementById("admin-others-list");
    if (othersList) {
      othersList.innerHTML = otherServices
        .map((service) => {
          const user = allUsers.find((u) => u.email === service.createdBy) || {};
          const statusText = t(service.status.toLowerCase()) || service.status;
          const typeText = t(service.serviceType.toLowerCase()) || service.serviceType;
          return `
            <tr>
              <td>${service.id}</td>
              <td>${user.firstName || ""} ${user.lastName || ""}</td>
              <td>${typeText}</td>
              <td>${new Date(service.date).toLocaleDateString()}</td>
              <td class="status-${service.status.toLowerCase()}">${statusText}</td>
              <td>${service.updatedBy || "N/A"}</td>
              <td>
                <button class="view-btn" data-type="others" data-id="${
                  service.id
                }"><img src="images/view.png" alt="${t(
            "view"
          )}" style="width: 25px; height: auto;"></button>
              </td>
            </tr>
          `;
        })
        .join("");
    }

    // Add event listeners to view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id");
        const itemType = this.getAttribute("data-type");
        showDetailsModal(itemId, itemType);
      });
    });
  }

  // Store new notification
  function addResidentNotification(email, subject, message) {
    const current = JSON.parse(
      localStorage.getItem("residentNotifications") || "[]"
    );
    const newNotif = {
      email,
      subject,
      message,
      time: new Date().toLocaleString(),
    };
    current.push(newNotif);
    localStorage.setItem("residentNotifications", JSON.stringify(current));

    // If resident is currently logged in and matches, show popup
    const active = localStorage.getItem("loggedInResident");
    if (active && active === email) {
      alert(`📬 ${t("new_notification")}:\n${subject}\n${message}`);
      showResidentNotifications(email);
    }
  }

  // Display notifications for a resident
  function showResidentNotifications(currentEmail) {
    const notifList = document.getElementById("notif-list");
    const notifCount = document.getElementById("notif-count");
    if (!notifList || !notifCount) return;

    const all = JSON.parse(
      localStorage.getItem("residentNotifications") || "[]"
    );
    const userNotifs = all.filter((n) => n.email === currentEmail);

    notifList.innerHTML = "";
    if (userNotifs.length > 0) {
      notifCount.textContent = userNotifs.length;
      userNotifs.reverse().forEach((n) => {
        const li = document.createElement("li");
        li.textContent = `${n.subject}: ${n.message} (${n.time})`;
        notifList.appendChild(li);
      });
    } else {
      notifList.innerHTML = `<li>${t("no_notifications")}</li>`;
      notifCount.textContent = "0";
    }
  }

  // Admin email form listener
  const waitForAdminForm = setInterval(() => {
    const emailForm = document.getElementById("email-form");
    if (emailForm && !emailForm.dataset.listenerAdded) {
      emailForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("resident-email")?.value.trim();
        const subject = document.getElementById("email-subject")?.value.trim();
        const message = document.getElementById("email-message")?.value.trim();

        if (email && subject && message) {
          addResidentNotification(email, subject, message);
          alert(`📧 ${t("email_sent")}: ${email}`);
          emailForm.reset();
        } else {
          alert(`⚠️ ${t("fill_all_fields")}`);
        }
      });

      emailForm.dataset.listenerAdded = "true";
      clearInterval(waitForAdminForm);
    }
  }, 500);

  function initializeLoginSignup() {
    const showSignupLink = document.getElementById("show-signup");
    const showLoginLink = document.getElementById("show-login");
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const togglePasswordBtns = document.querySelectorAll(".toggle-password");

    // Toggle between login and signup forms
    showSignupLink?.addEventListener("click", function (e) {
      e.preventDefault();
      if (loginContainer) loginContainer.style.display = "none";
      if (signupContainer) signupContainer.style.display = "block";
    });

    showLoginLink?.addEventListener("click", function (e) {
      e.preventDefault();
      if (signupContainer) signupContainer.style.display = "none";
      if (loginContainer) loginContainer.style.display = "block";
    });

    // Setup password toggle buttons
    togglePasswordBtns.forEach((btn) => {
      if (!btn) return;
      const inputId = btn
        .closest(".password-container")
        ?.querySelector("input")?.id;
      if (inputId) {
        btn.addEventListener("click", function () {
          togglePasswordVisibility(inputId, this);
        });
      }
    });

    // Login form submission
    document
      .getElementById("login-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value;

        // Find user (from your existing users array)
        const user = users.find((u) => u.email === email);

        // Validate credentials
        if (!user || user.password !== password) {
          alert(t("invalid_credentials"));
          return;
        }

        // Redirect based on user type
        currentUser = user;
        localStorage.setItem("loggedInResident", user.email);

        switch (user.userType) {
          case "resident":
            loadResidentPage();
            break;
          case "staff":
            loadStaffPage();
            break;
          case "admin":
            loadAdminPage();
            break;
          default:
            if (loginContainer) loginContainer.style.display = "block";
        }
      });

    // Signup form submission
    document
      .getElementById("signup-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("signup-email")?.value.trim();
        const firstName = document.getElementById("first-name")?.value.trim();
        const lastName = document.getElementById("last-name")?.value.trim();
        const userType = document.getElementById("user-type")?.value;
        const password = document.getElementById("signup-password")?.value;
        const confirmPassword = document.getElementById("confirm-password")?.value;

        // Validation
        if (!email || !firstName || !lastName || !userType || !password || !confirmPassword) {
          alert(t("fill_all_fields"));
          return;
        }

        if (password !== confirmPassword) {
          alert(t("passwords_not_match"));
          return;
        }

        if (users.some((user) => user.email === email)) {
          alert(t("user_exists"));
          return;
        }

        // Create new user
        const newUser = {email, firstName, lastName, userType, password, dateCreated: new Date().toISOString(),};

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Show role-specific instructions
        if (userType === "staff") {
          alert(t("account_created_staff"));
        } else if (userType === "admin") {
          alert(t("account_created_admin"));
        } else {
          alert(t("account_created"));
        }

        // Clear form and show login
        this.reset();
        if (signupContainer) signupContainer.style.display = "none";
        if (loginContainer) loginContainer.style.display = "block";
      });
  }

  function initializeResidentPage() {
    const residentContainer = document.getElementById("resident-container");
    const requestFormContainer = document.getElementById("request-form-container");
    const complaintFormContainer = document.getElementById("complaint-form-container");
    const othersFormContainer = document.getElementById("other-form-container");
    const trackingContainer = document.getElementById("tracking-container");
    const trackingBtns = document.querySelectorAll("#tracking-btn, .tracking-btn");
    const serviceType = document.getElementById("serviceType");
    const donationAmountGroup = document.getElementById("donationAmountGroup");
    const backToServicesFromOthers = document.getElementById("backToServicesFromOthers");
    const serviceTypeFilter = document.getElementById("serviceTypeFilter");
    const servicesList = document.getElementById("servicesList");
    const notifIcon = document.getElementById("notif-icon");
    const notifPanel = document.getElementById("notif-panel");

    // Show notifications if any
    if (currentUser) {
      showResidentNotifications(currentUser.email);
    }

    // Service card click handlers
    document.querySelectorAll(".service-btn").forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        const serviceType = this.getAttribute("data-service");
        hideAllContainers();

        switch (serviceType) {
          case "request":
            if (requestFormContainer)
              requestFormContainer.style.display = "block";
            break;
          case "complaint":
            if (complaintFormContainer)
              complaintFormContainer.style.display = "block";
            break;
          case "other":
            if (othersFormContainer)
              othersFormContainer.style.display = "block";
            updateServicesTable();
            break;
        }
      });
    });

    // My Submissions button handlers
    trackingBtns.forEach((btn) => {
      if (!btn) return;
      btn.addEventListener("click", function () {
        hideAllContainers();
        if (trackingContainer) trackingContainer.style.display = "block";
        loadResidentTracking();

        // Set the first tab as active by default
        const firstTabBtn = document.querySelector(
          ".tracking-tabs .tab-btn[data-tab='requests']"
        );
        if (firstTabBtn) firstTabBtn.click();
      });
    });

    // Form submission handlers
    document
      .getElementById("request-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        submitRequest();
      });

    document
      .getElementById("complaint-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        submitComplaint();
      });

    // Other Services Form submission handler
    if (otherServicesForm) {
      otherServicesForm.addEventListener("submit", handleOtherServicesSubmit);
    }

    // Event listener for service type change to show/hide donation amount field
    if (serviceType) {
      serviceType.addEventListener("change", function () {
        if (donationAmountGroup) {
          donationAmountGroup.style.display = this.value === "Donation" ? "block" : "none";
        }
      });
    }

    // Event listener for back button
    if (backToServicesFromOthers) {
      backToServicesFromOthers.addEventListener("click", function () {
        hideAllContainers();
        if (residentContainer) residentContainer.style.display = "block";
      });
    }

    // Event listener for filter change
    if (serviceTypeFilter) {
      serviceTypeFilter.addEventListener("change", updateServicesTable);
    }

    // Toggle notification dropdown
    if (notifIcon) {
      notifIcon.addEventListener("click", () => {
        if (notifPanel) {
          notifPanel.style.display = notifPanel.style.display === "none" ? "block" : "none";
        }
      });
    }
  }

  function initializeStaffPage() {
    const staffContainer = document.getElementById("staff-container");
    const staffDashboard = document.getElementById("staff-dashboard");

    // Staff verification
    document
      .getElementById("staff-auth-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = document.getElementById("staff-password")?.value;

        // Verify current user is actually staff
        if (!currentUser || currentUser.userType !== "staff") {
          alert(t("invalid_session"));
          hideAllContainers();
          showSplitScreen();
          if (loginContainer) loginContainer.style.display = "block";
          return;
        }

        if (password === "brgystff") {
          hideAllContainers();
          if (staffDashboard) staffDashboard.style.display = "block";
          loadStaffDashboard();
        } else {
          alert(t("invalid_staff_password"));
        }
      });
  }

  function initializeAdminPage() {
    const adminContainer = document.getElementById("admin-container");
    const adminDashboard = document.getElementById("admin-dashboard");

    // Admin verification
    document
      .getElementById("admin-auth-form")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = document.getElementById("admin-password")?.value;

        // Verify current user is actually admin
        if (!currentUser || currentUser.userType !== "admin") {
          alert(t("invalid_session"));
          hideAllContainers();
          showSplitScreen();
          if (loginContainer) loginContainer.style.display = "block";
          return;
        }

        if (password === "admin") {
          hideAllContainers();
          if (adminDashboard) adminDashboard.style.display = "block";
          loadAdminDashboard();
        } else {
          alert(t("invalid_admin_password"));
        }
      });
  }
});
