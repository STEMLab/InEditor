/**
 * @author suheeeee<lalune1120@hotmail.com>
 */
define(function(require) {

  /**
   * @class
   * @name Storage
   */
  var singleton = (function() {

    function CodeList() {
      /** key : code number, value : desc */
      var List = {
        "GeneralSpace": {
          "class": {
            "1000": "Administration",
            "1010": "Business, trade",
            "1020": "Education, training",
            "1030": "Recreation",
            "1040": "Art, performance",
            "1050": "Healthcare",
            "1060": "Laboratory",
            "1070": "Service",
            "1080": "Production",
            "1090": "Storage",
            "1100": "Security",
            "1110": "Accommodation, Waste management"
          },
          "function": {
            "1000": "Elevator Machine Room",
            "1010": "Fire Command Center",
            "1020": "Men’s Restroom",
            "1030": "Unisex Restroom",
            "1040": "Refrigerant Machinery Room",
            "1050": "Incinerator Room",
            "1060": "Gas Room",
            "1070": "Liquid Use, Dispensing and Mixing Room",
            "1080": "Electrical Room",
            "1090": "Telecommunications Room",
            "1100": "Hazardous Waste Storage",
            "1110": "Building Manager Office",
            "1120": "Guard Stations",
            "1130": "Women’s Restroom",
            "1140": "Furnace Room",
            "1150": "Fuel Room",
            "1160": "Liquid Storage Room",
            "1170": "Hydrogen Cutoff Room",
            "1180": "Switch Room",
            "1190": "Classrooms",
            "1200": "Assembly Hall",
            "1210": "Physics Teaching Laboratory",
            "1220": "Open Class Laboratory",
            "1230": "Laboratory Service Space",
            "1240": "Computer Lab",
            "1250": "Training Support Space",
            "1260": "Study Room",
            "1270": "Evidence Room",
            "1280": "Witness Stand",
            "1290": "Robing Area",
            "1300": "Council Chambers",
            "1310": "Armory",
            "1320": "General Performance Spaces",
            "1330": "Orchestra Pit",
            "1340": "Performance Hall",
            "1350": "Audience Space",
            "1360": "Audience Seating Space",
            "1370": "Projection Booth",
            "1380": "Stage Wings",
            "1390": "Art Gallery",
            "1400": "Sculpture Garden",
            "1410": "Recording Studio",
            "1420": "Photo Lab",
            "1430": "Library",
            "1440": "Mediation Chapel",
            "1450": "Reflection Space",
            "1460": "Chapel",
            "1470": "Shrine",
            "1480": "Confessional Space",
            "1490": "Tabernacle",
            "1500": "Choir Loft",
            "1510": "Marriage Sanctuary",
            "1520": "Mental Health Quiet Room",
            "1530": "Bone Densitometry Room",
            "1540": "CT Simulator Room",
            "1550": "Head Radiographic Room",
            "1560": "Mobile Imaging System Alcove",
            "1570": "MRI System Component Room",
            "1580": "PET/CT Simulator Room",
            "1590": "Radiographic Room",
            "1600": "Stereotactic Mammography Room",
            "1610": "Ultrasound/Optical Coherence Tomography Room",
            "1620": "Angiographic Control Room",
            "1630": "Angiographic Procedure Control Area",
            "1640": "Silver Collection Area",
            "1650": "Computer Image Processing Area",
            "1660": "CT Control Area",
            "1670": "Image Quality Control Room",
            "1680": "X-Ray, Plane Film Storage Space",
            "1690": "MRI Control Room",
            "1700": "MRI Viewing Room",
            "1710": "Radiographic Control Room",
            "1720": "Tele-Radiology/Tele-Medicine Room",
            "1730": "Radiation Diagnostic and Therapy Spaces",
            "1740": "Health Physics Laboratory",
            "1750": "Linear Accelerator Entrance Maze, Healthcare",
            "1760": "Radioactive Waste Storage Room, Healthcare",
            "1770": "Nuclear Medicine Scanning Room",
            "1780": "Patient Dose/Thyroid Uptake Room",
            "1790": "Radiopharmacy",
            "1800": "Radiation Therapy, Mold Fabrication Shop",
            "1810": "Hearth and Lung Diagnostic and Treatment Spaces",
            "1820": "Cardiac Catheter Instrument Room",
            "1830": "Cardiac Catheter Control Room",
            "1840": "Cardiac Electrophysiology Room",
            "1850": "Echocardiograph Room",
            "1860": "Extended Pulmonary Function Testing Laboratory",
            "1870": "Pacemaker ICD Interrogation Room",
            "1880": "Procedure Viewing Area",
            "1890": "Pulmonary Function Treadmill Room",
            "1900": "Respiratory Therapy Clean-up Room",
            "1910": "General Diagnostic Procedure and Treatment Spaces",
            "1920": "Endoscopy/Gastroenterology Spaces",
            "1930": "Clinical Laboratory Spaces",
            "1940": "Pharmacy Spaces",
            "1950": "Rehabilitation Spaces",
            "1960": "Medical Research and Development Spaces",
            "1970": "Chemistry Laboratories",
            "1980": "Physical Sciences Laboratories",
            "1990": "Earth and Environmental Sciences Laboratories",
            "2000": "Psychology Laboratories",
            "2010": "Dry Laboratories",
            "2020": "Wet Laboratories",
            "2030": "Biosciences Laboratories",
            "2040": "Astronomy Laboratories",
            "2050": "Forensics Laboratories",
            "2060": "Bench Laboratories",
            "2070": "Integration Laboratories",
            "2080": "Laboratory Storage Spaces",
            "2090": "Office Spaces",
            "2100": "Dedicated Enclosed Workstation",
            "2110": "Open Team Setting",
            "2120": "Shared Equipment Station",
            "2130": "Banking Spaces",
            "2140": "Automatic Teller Machine Space",
            "2150": "Trading Spaces",
            "2160": "Demonstration Spaces",
            "2170": "Checkout Space",
            "2180": "Fitting Space",
            "2190": "Auction Room",
            "2200": "Commercial Service and Repair Spaces",
            "2210": "Hotel, Motel, Hostel, and Dormitory Service Spaces",
            "2220": "Hotel Residence Room",
            "2230": "Commercial Support Spaces",
            "2240": "Dormitory",
            "2250": "Information Counter",
            "2260": "Post Office Space",
            "2270": "Mail Room Space",
            "2280": "Conference Room",
            "2290": "Grooming Activity Spaces",
            "2300": "Haircutting Space",
            "2310": "Cooking Spaces",
            "2320": "Food Preparation Space",
            "2330": "Dishwashing Station",
            "2340": "Dining Room",
            "2350": "Food Court",
            "2360": "Salad Bar",
            "2370": "Beverage Station",
            "2380": "Serving Station",
            "2390": "Cafeteria Vending Space",
            "2400": "Food Discard Station",
            "2410": "Child Care Spaces",
            "2420": "Child Day Care Space",
            "2430": "CLD–Child Care",
            "2440": "Rest Area",
            "2450": "Laundry/Dry Cleaning Space",
            "2460": "Locker Room",
            "2470": "Supply Room",
            "2480": "On-call Room",
            "2490": "Shower Space",
            "2500": "Ablution Room",
            "2510": "Mud Room",
            "2520": "Bedroom",
            "2530": "Mental Health Resident Bedroom, Bariatric",
            "2540": "Kitchen",
            "2550": "Lecture Classroom",
            "2560": "Lecture Hall",
            "2570": "Seminar Room",
            "2580": "Astronomy Teaching Laboratory",
            "2590": "Research/non-class Class Laboratory",
            "2600": "Training Space",
            "2610": "Woodshop/Metalshop",
            "2620": "Religious Education Space",
            "2630": "Study Service",
            "2640": "Basketball Courts",
            "2650": "Team Athletic Recreation Spaces",
            "2660": "Volleyball Court",
            "2670": "Boxing Ring",
            "2680": "Circuit Training Course Area",
            "2690": "Aerobic Studio",
            "2700": "Swimming Pool",
            "2710": "Firing Range",
            "2720": "Hobby and Craft Center",
            "2730": "Exercise Room",
            "2740": "Skating Rink",
            "2750": "Climbing Wall",
            "2760": "Diving Tank",
            "2770": "Game Room",
            "2780": "Fitness Center",
            "2790": "Weight Room",
            "2800": "Courtroom",
            "2810": "Jury Room",
            "2820": "Jury Assembly Space",
            "2830": "Judge’s Chambers",
            "2840": "Hearing Room",
            "2850": "Legislative Hearing Room",
            "2860": "Acting Stage",
            "2870": "Performance Rehearsal Space",
            "2880": "Banding Training Space",
            "2890": "Pre-Function Lobby",
            "2900": "Supporting Performance Space",
            "2910": "Catwalk",
            "2920": "Motion Picture Screen Space",
            "2930": "Exhibit Gallery",
            "2940": "Display Space",
            "2950": "Artist’s Studio",
            "2960": "Media Production",
            "2970": "Museum Gallery",
            "2980": "Baptistery",
            "2990": "Cathedra",
            "3000": "Clean Room",
            "3010": "Data Center",
            "3020": "Computer Server Room",
            "3030": "Exam Room",
            "3040": "General Examination Space",
            "3050": "Labor, Delivery, Recovery, Postpartum Room",
            "3060": "Newborn Nursery",
            "3070": "Patient Room",
            "3080": "Clean Supply Room",
            "3090": "Consultation Room",
            "3100": "Equipment Storage Room",
            "3110": "Nurse Workspace",
            "3120": "Nurse Triage Space",
            "3130": "Mental Health Multipurpose room w/Control Room",
            "3140": "Holding Room, Secured",
            "3150": "Anteroom",
            "3160": "Medical Information Computer System Room",
            "3170": "Nursery Transport Unit Alcove",
            "3180": "Clean Linen Storage Room",
            "3190": "Clean Utility Room",
            "3200": "Mental Health Interview/Counseling Room",
            "3210": "Medical Records Storage room",
            "3220": "Nurse Station",
            "3230": "Soiled Utility Room",
            "3240": "Resuscitation Cart Alcove",
            "3250": "Angiographic Procedure Room",
            "3260": "CT Scanning Room",
            "3270": "Cystoscopic Radiology Room",
            "3280": "Mammography Room",
            "3290": "MRI Scanning Room",
            "3300": "PET/CT Scanning Room",
            "3310": "Radiographic Chest Room",
            "3320": "Radiology Computer Systems Room",
            "3330": "Ultrasound Room",
            "3340": "Whole Body Scanning Room",
            "3350": "Angiographic Instrument Room",
            "3360": "Angiographic System Component Room",
            "3370": "Computed Radiology Reader Area",
            "3380": "X-Ray, Digital Image Storage Space",
            "3390": "CT power and Equipment Room",
            "3400": "Image Reading Room",
            "3410": "Mammography Processing Room",
            "3420": "MRI Equipment Storage Room",
            "3430": "PET/CT Control Room",
            "3440": "Radiographic Darkroom",
            "3450": "Viewing/Consultation Room, Diagnostic Imaging",
            "3460": "Equipment Calibration Space, Radiation Diagnostic and Therapy",
            "3470": "Linear Accelerator Component Room, Healthcare",
            "3480": "Linear Accelerator Room, Healthcare",
            "3490": "Nuclear Medicine Dose Calibration Space",
            "3500": "Nuclear Medicine Patient “Hot” Waiting Room",
            "3510": "Radiation Dosimetry Planning Room",
            "3520": "Radium Cart Holding Space",
            "3530": "Sealed Source Room",
            "3540": "Brachytherapy Room",
            "3550": "Cardiac Catheter System Component Room",
            "3560": "Cardiac Catheter Laboratory",
            "3570": "Cardiac Testing Room",
            "3580": "EKG Testing Room",
            "3590": "Microvascular Laboratory",
            "3600": "Pacemaker/Holter Monitor Room",
            "3610": "Pulmonary Function Testing Laboratory",
            "3620": "Pulmonary Screening Room",
            "3630": "Respiratory Inhalation Cubicle",
            "3640": "Eye and Ear Healthcare Spaces",
            "3650": "Surgical Spaces",
            "3660": "Clinical Laboratory Support Spaces",
            "3670": "Medical Services Logistic Spaces",
            "3680": "Dental Spaces",
            "3690": "Press Conference Room",
            "3700": "War Room",
            "3710": "Waiting Space",
            "3720": "Waiting Room",
            "3730": "Office Service",
            "3740": "Shared Open Workstation",
            "3750": "General File and Storage",
            "3760": "Lookout Gallery",
            "3770": "Bank Teller Space",
            "3780": "Vault",
            "3790": "Trading Floor",
            "3800": "Sales Spaces",
            "3810": "Display Space",
            "3820": "Vending Machine Area",
            "3830": "Pet Shop Animal Space",
            "3840": "Makeup Space",
            "3850": "Food Service",
            "3860": "Kitchen Space",
            "3870": "Cooking Space",
            "3880": "Dining and Drinking Spaces",
            "3890": "Banquet Hall",
            "3900": "Snack Bar",
            "3910": "Liquor Bar",
            "3920": "Table Bussing Station",
            "3930": "Vending Perishable Product Space",
            "3940": "Tray Return Space",
            "3950": "Coffee stations",
            "3960": "Daycare sickroom",
            "3970": "Play Room",
            "3980": "Resting Spaces",
            "3990": "Break Room",
            "4000": "Smoking Space",
            "4010": "Filing Space",
            "4020": "Unit Storage",
            "4030": "Bathroom",
            "4040": "Toilet Space",
            "4050": "Combination Toilet and Bathing Space",
            "4060": "Laundry Room",
            "4070": "Mental Health Resident Bedroom",
            "4080": "Nursery"

          }
        },
        "TransitionSpace": {
          "class": {
            "1000": "Horizontal Transition",
            "1010": "Vertical Transition"
          },
          "function": {
            "1000": "Corridor",
            "1010": "Breezeway",
            "1020": "Box Lobby",
            "1030": "Elevator Lobby",
            "1040": "Landing",
            "1050": "Aisle ",
            "1060": "Ramp",
            "1070": "Concourse",
            "1080": "Moving walkway",
            "1090": "Entry Lobby",
            "1100": "Jet way",
            "1110": "Elevator Shaft",
            "1120": "Stair",
            "1130": "Chute"
          }
        },
        "ConnectionSpace": {
          "class": {
            "1000": "Door",
            "1010": "Vestbule",
            "1020": "Sally port"
          },
          "function": {
            "1000": "Door",
            "1010": "Vestbule",
            "1060": "Sally port"
          }
        },
        "AnchorSpace": {
          "class": {
            "1000": "Vestibule",
            "1020": "Gate"
          },
          "function": {
            "1000": "Entry Vestibule",
            "1010": "Exterior door",
            "1020": "Gate",
            "1030": "Emergency door"
          }
        },
        "ConnectionBoundary": {
          "class": {
            "1000": "Door",
            "1010": "Vestbule",
            "1020": "Sally port",
            "1030": "Window"
          },
          "function": {
            "1000": "Door",
            "1010": "Vestbule",
            "1060": "Sally port",
            "1030": "Window"
          }
        },
        "AnchorBoundary": {
          "class": {
            "1000": "Vestibule",
            "1020": "Gate"
          },
          "function": {
            "1000": "Entry Vestibule",
            "1010": "Exterior door",
            "1020": "Gate",
            "1030": "Emergency door"
          }
        },
        "NonNavigableSpace": {

        }
      }

      this.getList = function(){
        return List;
      }

      /**
      * @params [path], desc
      */
      this.getCodeNum = function(path, desc) {
        if(path[0] == 'NonNavigableSpace') {
          var descs = Object.values(List['NonNavigableSpace']);
          var index = descs.indexOf(desc);
          return index != -1 ? Object.keys(List[path[0]])[index] : undefined;
        }

        var descs = Object.values(List[path[0]][path[1]]);
        var index = descs.indexOf(desc);
        return index != -1 ? Object.keys(List[path[0]][path[1]])[index] : undefined;

      }

      this.getDesc = function(path, code) {
        if(path[0] == 'NonNavigableSpace')
          return List['NonNavigableSpace'][code];
        else return List[path[0]][path[1]][code];
      }

      this.addCode = function(path, code, desc, disablePopup) {
        var type, title, content = '';
        function setProeprty(ty, ti, c){
          type = ty != undefined ? ty : "info";
          title = ti != undefined ? ti : "";
          content = c != undefined ? c : "";
        }

        if(path[0] == 'NonNavigableSpace'){
          if (List[path[0]][code] != undefined) setProeprty('warning', 'NonNavigableSpace ' + code + ' is already exist');
          else if (isNaN(code) || code == "") setProeprty('warning', 'Invalide Code Numbe', code);
          else if (desc == "") setProeprty('warning', 'Invalide Code Description', 'null');
          else if (desc.split('-').length>= 2) setProeprty('warning', 'Invalide Code Description', desc);
          else {
            setProeprty('success', 'Successed to add new code', path[0] + '\n' + code + ' : ' + desc);
            List[path[0]][code] = desc;
          }

          if(disablePopup == undefined || disablePopup == false)
            require('Popup')(type, title, content);
        }
        else{
          if (List[path[0]] == undefined) setProeprty('warning', 'Invalide Object type : ' + path[0]);
          else if (List[path[0]][path[1]] == undefined) setProeprty('warning', 'Invalide Code type : ' + path[1]);
          else if (List[path[0]][path[1]][code] != undefined) setProeprty('warning', path[0] + '-' + path[1] + '-' + code + ' is already exist');
          else if (isNaN(code) || code == "") setProeprty('warning', 'Invalide Code Number : ' + code);
          else {
            setProeprty('success', 'Successed to add new code', path[0] + '-' + path[1] + '\n' + code + ' : ' + desc);
            List[path[0]][path[1]][code] = desc;
          }

          if(disablePopup == undefined || disablePopup == false)
            require('Popup')(type, title, content);
        }
      }

      this.deleteCode = function(path, code){
        try{
          if(path[0] == 'NonNavigableSpace') delete List[path[0]][code];
          else delete List[path[0]][path[1]][code];
          return 1;
        }
        catch(e){
          log.warn(e);
          return 0;
        }
      }

      this.load = function(oldList){
        for(var t of Object.keys(oldList)){
          if(t == 'NonNavigableSpace'){
            for(var num in oldList[t]) this.addCode([t], num, oldList[t][num], true);
          }
          else{
            var f = oldList[t]['function'];
            var c = oldList[t]['class'];

            for(var num in f) this.addCode([t, 'function'], num, f[num], true);
            for(var num in c) this.addCode([t, 'class'], num, c[num], true);
          }
        }
      }
    }


    var INSTANCE;

    return {
      getInstance: function(args) {
        if (INSTANCE === undefined) {
          INSTANCE = new CodeList(args);
        }
        return INSTANCE;
      }
    };

  })();

  return singleton;
});
