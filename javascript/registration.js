const selectCourseDropdown = document.getElementById("SelectedCourse")
const Diploma = document.querySelector("#diploma")
const Certificate = document.querySelector("#certificate")
const Prices = document.querySelector("#prices")

const courseInfo = {
    data_science: {
        name: 'Data Science',
        diploma: "100,000",
        certificate: "120,000"
    },
    data_analytics: {
        name: 'Data Analytics',
        diploma: "100,000",
        certificate: "120,000"
    },
    cloud_computing: {
        name: 'Cloud computing',
        diploma: "100,000",
        certificate: "120,000"
    },
    network_engineering: {
        name: 'Network engineering',
        diploma: "100,000",
        certificate: "120,000"
    },
    auto_cad_animation: {
        name: 'Auto CAD & Animation',
        diploma: "100,000",
        certificate: "120,000"
    },
    java: {
        name: 'Java',
        diploma: "100,000",
        certificate: "120,000"
    },
    php: {
        name: 'PHP',
        diploma: "100,000",
        certificate: "120,000"
    },
    automation: {
        name: 'Automation',
        diploma: "100,000",
        certificate: "120,000"
    },
    sql: {
        name: 'SQL',
        diploma: "100,000",
        certificate: "120,000"
    },
    visual_basic: {
        name: 'Visual Basic',
        diploma: "50,000",
        certificate: "80,000"
    },
    Qbasic: {
        name: 'Qbasic',
        diploma: "100,000",
        certificate: "120,000"
    },
    assembly_language: {
        name: 'Assembly Language',
        diploma: "100,000",
        certificate: "120,000"
    },
    C_plus: {
        name: 'Visual C++(GUI and Console',
        diploma: "100,000",
        certificate: "120,000"
    },
    android_development: {
        name: 'Android programming/Application development',
        diploma: "100,000",
        certificate: "120,000"
    },
    oracle_scripting: {
        name: 'Oracle & Scripting Language',
        diploma: "100,000",
        certificate: "120,000"
    },
    C_sharp: {
        name: 'C#',
        diploma: "100,000",
        certificate: "120,000"
    },
    cyber_security: {
        name: 'Cyber Security',
        diploma: "100,000",
        certificate: "120,000"
    },
    fullstack_dev: {
        name: 'Fullstack Web Development',
        diploma: "140,000",
        certificate: "180,000"
    },
    frontend_dev: {
        name: 'Front-End Web Development',
        diploma: "80,000",
        certificate: "100,000"
    },
    backend_dev: {
        name: 'Cyber Security',
        diploma: "100,000",
        certificate: "130,000"
    },
    graphic_design: {
        name: 'Graphic design & video editing',
        diploma: "80,000",
        certificate: "100,000"
    },
    amazon_cloud: {
        name: 'Amazon Cloud',
        diploma: "100,000",
        certificate: "120,000"
    },
    amazon_devop: {
        name: 'Amazon Devops',
        diploma: "80,000",
        certificate: "110,000"
    },
    amazon_web_services: {
        name: 'Amazon Web Services',
        diploma: "100,000",
        certificate: "120,000"
    },
    animation_3D: {
        name: '3D Animation',
        diploma: "300,000",
        certificate: "350,000"
    },
    game_development: {
        name: 'Game Development',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_marketing: {
        name: 'Digital Marketing',
        diploma: "80,000",
        certificate: "100,000"
    },
    digital_security: {
        name: 'Digital Security',
        diploma: "1,000,000",
        certificate: "1,030,000"
    },
    digital_security_1: {
        name: 'CCTV/IP Surveillance',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_2: {
        name: 'PABX & Intercom System',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_3: {
        name: 'VSAT Field Engineering',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_4: {
        name: 'Electric Fencing',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_5: {
        name: 'Radio Message',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_6: {
        name: 'Car Tracking and Fleet Management',
        diploma: "100,000",
        certificate: "120,000"
    },
    digital_security_7: {
        name: 'Biometric and Access Control Management ',
        diploma: "100,000",
        certificate: "120,000"
    },
    cisco: {
        name: ' Cisco (CCNA Training) + Course materials',
        diploma: "100,000",
        certificate: "120,000"
    },
    networking_one: {
        name: 'Networking (in line with Comptia N+)',
        diploma: "100,000",
        certificate: "120,000"
    },

    networking_two: {
        name: 'Networking +(cyber caf management and administration)',
        diploma: "100,000",
        certificate: "120,000"
    },
    computer_engineering: {
        name: 'Computer Engineering (in line with Comptia N+)',
        diploma: "100,000",
        certificate: "120,000"
    },
    office_suite: {
        name: 'Office Productivity Suite/Google Suite',
        diploma: "80,000",
        certificate: "100,000"
    },
    ip_pbx_and_voip: {
        name: 'IP PBX/PABX and VOIP Training',
        diploma: "230,000",
        certificate: "250,000"
    },
    google_sketchup_3D_rendering: {
        name: 'Google SketchUP 3D BIM & Rendering',
        diploma: "100,000",
        certificate: "120,000"
    },
    autocad_2D_architecture_and3D: {
        name: 'AutoCAD 2D & 3D for Architectural/Mechanical Drafting/design/modeling',
        diploma: "100,000",
        certificate: "120,000"
    },
    archicad_3D_bim_rendering: {
        name: 'ArchiCAD 3D BIM & Rendering',
        diploma: "100,000",
        certificate: "120,000"
    },
    revit_archi_3D_bim_rendering: {
        name: 'Revit Architectural 3D BIM & Rendering',
        diploma: "100,000",
        certificate: "120,000"
    },
    autodesk_3D_max: {
        name: 'Autodesk 3d Max (Modeling/Rendering/Animation)',
        diploma: "100,000",
        certificate: "120,000"
    },
    renewable_energy: {
        name: 'Renewable Energy',
        diploma: "100,000",
        certificate: "120,000"
    },
    electrical_engineering: {
        name: 'Electrical Engineering',
        diploma: "100,000",
        certificate: "120,000"
    },
    business_accounting_statistic: {
        name: 'BUSINESS/ACCOUNTANCY/STATISTICS',
        diploma: "100,000",
        certificate: "120,000"
    },
    entreprenuership: {
        name: 'ENTREPRENUERSHIP STUDIES',
        diploma: "100,000",
        certificate: "120,000"
    },
    vs_auto_mechanic: {
        name: 'Vocational Study/Auto Mechanic',
        diploma: "100,000",
        certificate: "120,000"
    },
    vs_buiding_contruction: {
        name: 'Vocational Study/Building and Construction',
        diploma: "100,000",
        certificate: "120,000"
    },
    vs_fashion_beauty: {
        name: 'Vocational Study/Fashion & Beauty',
        diploma: "100,000",
        certificate: "120,000"
    },
    vs_photography: {
        name: 'Vocational Study/Photography',
        diploma: "100,000",
        certificate: "120,000"
    },
    vs_mtl: {
        name: 'Vocational Study/Manufacturing/Transportation/Logistics',
        diploma: "100,000",
        certificate: "120,000"
    },

    public_administration: {
        name: 'PUBLIC ADMINISTRATION',
        diploma: "100,000",
        certificate: "120,000"
    },
};

// Loop through the courseInfo object and get the keys in alphabetical order
const sortedKeys = Object.keys(courseInfo).sort();

// Loop through the sorted keys to dynamically create the options for the SelectCourse dropdown
sortedKeys.forEach((course) => {
    const option = document.createElement("option");
    option.value = course; // value of the option
    option.text = courseInfo[course].name; // text in the option html
    option.name = courseInfo[course].name; // name of the option
    selectCourseDropdown.add(option); // add the option to the dropdown
});


selectCourseDropdown.addEventListener('click', () => {
    Prices.innerHTML = 'Price: '

})

Diploma.addEventListener('click', () => {
    const course = selectCourseDropdown.value; // get the selected course value
    const diploma = courseInfo[course].diploma; //get the selected course value price for diploma
    Prices.innerHTML = 'Price: ₦' + diploma
})

Certificate.addEventListener('click', () => {
    const course = selectCourseDropdown.value; // get the selected course value
    const certificate = courseInfo[course].certificate;  //get the selected course value price for Certificate
    Prices.innerHTML = 'Price: ₦' + certificate
})
