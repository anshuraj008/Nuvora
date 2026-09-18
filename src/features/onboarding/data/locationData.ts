export interface StateLocationData {
  state: string;
  name: string;
  cities: { value: string; label: string; colleges?: string[] }[];
}

export const INDIAN_STATES = [
  { value: 'JH', label: 'Jharkhand' },
  { value: 'DL', label: 'Delhi NCR' },
  { value: 'WB', label: 'West Bengal' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'HR', label: 'Haryana' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'BR', label: 'Bihar' },
  { value: 'TS', label: 'Telangana' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'PB', label: 'Punjab' },
  { value: 'KL', label: 'Kerala' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'OD', label: 'Odisha' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'GA', label: 'Goa' },
];

export const CITIES_BY_STATE: Record<
  string,
  { value: string; label: string; colleges: string[] }[]
> = {
  JH: [
    {
      value: 'dumka',
      label: 'Dumka',
      colleges: ["Sido Kanhu Murmu University (SKMU)", "St. Xavier's College Dumka", 'Dumka Engineering College', 'S.P. College Dumka'],
    },
    {
      value: 'ranchi',
      label: 'Ranchi',
      colleges: ['BIT Mesra', 'IIM Ranchi', 'National University of Study and Research in Law (NUSRL)', 'Xavier Institute of Social Service (XISS)', 'Ranchi University', 'St. Xavier’s College Ranchi', 'IIIT Ranchi'],
    },
    {
      value: 'jamshedpur',
      label: 'Jamshedpur',
      colleges: ['XLRI Xavier School of Management', 'NIT Jamshedpur', 'MGMC Jamshedpur', 'Arka Jain University'],
    },
    {
      value: 'dhanbad',
      label: 'Dhanbad',
      colleges: ['IIT (ISM) Dhanbad', 'BIT Sindri', 'Binod Bihari Mahto Koyalanchal University (BBMKU)'],
    },
    {
      value: 'deoghar',
      label: 'Deoghar',
      colleges: ['AIIMS Deoghar', 'BIT Deoghar Extension Centre', 'Deoghar College'],
    },
    {
      value: 'bokaro',
      label: 'Bokaro Steel City',
      colleges: ['Bokaro Steel City College', 'Guru Gobind Singh Educational Society', 'B.S. City College'],
    },
    {
      value: 'hazaribagh',
      label: 'Hazaribagh',
      colleges: ["St. Columba's College", 'Vinoba Bhave University (VBU)', 'Hazaribagh Medical College'],
    },
  ],

  DL: [
    {
      value: 'delhi-north',
      label: 'Delhi (North Campus & Central)',
      colleges: ["St. Stephen's College", 'SRCC', 'Hindu College', 'Hansraj College', 'Delhi School of Economics', 'Faculty of Management Studies (FMS)'],
    },
    {
      value: 'delhi-south',
      label: 'Delhi (South Campus & Hauz Khas)',
      colleges: ['IIT Delhi', 'Lady Shri Ram College (LSR)', 'Sri Venkateswara College', 'IIIT Delhi', 'Jawaharlal Nehru University (JNU)', 'AIIMS New Delhi'],
    },
    {
      value: 'noida',
      label: 'Noida (Delhi NCR)',
      colleges: ['Amity University Noida', 'Jaypee Institute of Information Technology (JIIT)', 'Bennett University', 'Symbiosis Centre for Management Studies (SCMS)'],
    },
    {
      value: 'greater-noida',
      label: 'Greater Noida',
      colleges: ['Shiv Nadar University (SNU)', 'Sharda University', 'Galgotias University', 'Gautam Buddha University'],
    },
    {
      value: 'gurugram',
      label: 'Gurugram (Delhi NCR)',
      colleges: ['Management Development Institute (MDI)', 'The NorthCap University', 'GD Goenka University', 'KR Mangalam University'],
    },
    {
      value: 'delhi-west-east',
      label: 'Delhi (Dwarka / Rohini / East)',
      colleges: ['Delhi Technological University (DTU)', 'Netaji Subhas University of Technology (NSUT)', 'Guru Gobind Singh Indraprastha University (GGSIPU)', 'Jamia Millia Islamia'],
    },
  ],

  WB: [
    {
      value: 'kolkata',
      label: 'Kolkata',
      colleges: ['Jadavpur University', 'Presidency University', 'Calcutta University', "St. Xavier's College Kolkata", 'IIM Calcutta (Joka)', 'Indian Statistical Institute (ISI)'],
    },
    {
      value: 'durgapur',
      label: 'Durgapur',
      colleges: ['NIT Durgapur', 'NSHM Knowledge Campus Durgapur', 'Dr. B.C. Roy Engineering College', 'Bengal College of Engineering & Technology'],
    },
    {
      value: 'kharagpur',
      label: 'Kharagpur',
      colleges: ['IIT Kharagpur', 'Vidyasagar University Midnapore'],
    },
    {
      value: 'asansol',
      label: 'Asansol',
      colleges: ['Kazi Nazrul University', 'Asansol Engineering College', 'B.C. College Asansol'],
    },
    {
      value: 'siliguri',
      label: 'Siliguri',
      colleges: ['North Bengal University (NBU)', 'Siliguri Institute of Technology', 'Salesian College'],
    },
    {
      value: 'howrah-hooghly',
      label: 'Howrah / Shibpur',
      colleges: ['IIEST Shibpur', 'Heritage Institute of Technology', 'Techno India University'],
    },
  ],

  KA: [
    {
      value: 'bengaluru',
      label: 'Bengaluru (Bangalore)',
      colleges: ['IISc Bengaluru', 'IIM Bangalore', 'RV College of Engineering (RVCE)', 'PES University', 'BMS College of Engineering', 'Christ University', 'IIIT Bangalore', 'National Law School (NLSIU)'],
    },
    {
      value: 'mysuru',
      label: 'Mysuru (Mysore)',
      colleges: ['University of Mysore', 'National Institute of Engineering (NIE)', 'Sri Jayachamarajendra College of Engineering (SJCE)'],
    },
    {
      value: 'mangaluru',
      label: 'Mangaluru / Surathkal',
      colleges: ['NITK Surathkal', 'Manipal University', 'St. Aloysius College', 'Yenepoya University'],
    },
    {
      value: 'manipal',
      label: 'Manipal',
      colleges: ['Manipal Academy of Higher Education (MAHE)', 'Manipal Institute of Technology (MIT)', 'KMC Manipal'],
    },
  ],

  TN: [
    {
      value: 'chennai',
      label: 'Chennai',
      colleges: ['IIT Madras', 'Anna University (CEG)', 'Loyola College Chennai', 'Madras Christian College (MCC)', 'SRM Institute of Science & Technology', 'SSN College of Engineering'],
    },
    {
      value: 'coimbatore',
      label: 'Coimbatore',
      colleges: ['PSG College of Technology', 'Amrita Vishwa Vidyapeetham', 'Coimbatore Institute of Technology (CIT)', 'Kumaraguru College of Technology'],
    },
    {
      value: 'trichy',
      label: 'Tiruchirappalli (Trichy)',
      colleges: ['NIT Trichy (NITT)', 'IIM Trichy', 'Bharathidasan University', 'National College Trichy'],
    },
    {
      value: 'madurai',
      label: 'Madurai',
      colleges: ['Thiagarajar College of Engineering', 'Madurai Kamaraj University', 'American College Madurai'],
    },
    {
      value: 'vellore',
      label: 'Vellore',
      colleges: ['Vellore Institute of Technology (VIT)', 'Christian Medical College (CMC)'],
    },
  ],

  MH: [
    {
      value: 'mumbai',
      label: 'Mumbai',
      colleges: ['IIT Bombay (Powai)', "St. Xavier's College Mumbai", 'NMIMS Mumbai', 'Institute of Chemical Technology (ICT)', 'Veermata Jijabai Technological Institute (VJTI)', 'HR College of Commerce & Economics', 'SPJIMR'],
    },
    {
      value: 'pune',
      label: 'Pune',
      colleges: ['College of Engineering Pune (COEP)', 'Symbiosis International University', 'MIT World Peace University (MIT-WPU)', 'FLAME University', 'Fergusson College', 'Armed Forces Medical College (AFMC)'],
    },
    {
      value: 'nagpur',
      label: 'Nagpur',
      colleges: ['VNIT Nagpur', 'IIM Nagpur', 'AIIMS Nagpur', 'Rashtrasant Tukadoji Maharaj Nagpur University'],
    },
    {
      value: 'navi-mumbai',
      label: 'Navi Mumbai',
      colleges: ['D.Y. Patil University', 'SIES Graduate School of Technology', 'NIFT Mumbai'],
    },
  ],

  UP: [
    {
      value: 'noida-up',
      label: 'Noida',
      colleges: ['Amity University', 'JIIT Noida', 'IMS Noida'],
    },
    {
      value: 'lucknow',
      label: 'Lucknow',
      colleges: ['IIM Lucknow', "King George's Medical University (KGMU)", 'University of Lucknow', 'IIIT Lucknow', 'BBD University'],
    },
    {
      value: 'kanpur',
      label: 'Kanpur',
      colleges: ['IIT Kanpur', 'HBTU Kanpur', 'GSVM Medical College', 'CSJM University'],
    },
    {
      value: 'varanasi',
      label: 'Varanasi',
      colleges: ['IIT (BHU) Varanasi', 'Banaras Hindu University (BHU)', 'Mahatma Gandhi Kashi Vidyapith'],
    },
    {
      value: 'prayagraj',
      label: 'Prayagraj (Allahabad)',
      colleges: ['MNNIT Allahabad', 'IIIT Allahabad', 'University of Allahabad'],
    },
    {
      value: 'aligarh',
      label: 'Aligarh',
      colleges: ['Aligarh Muslim University (AMU)', 'Zakir Husain College of Engineering & Technology'],
    },
  ],

  HR: [
    {
      value: 'gurugram-hr',
      label: 'Gurugram',
      colleges: ['MDI Gurgaon', 'The NorthCap University', 'Ansal University (Sushant University)', 'Apeejay Stya University'],
    },
    {
      value: 'sonipat',
      label: 'Sonipat / Rai',
      colleges: ['Ashoka University', 'O.P. Jindal Global University (JGU)', 'DCRUST Murthal', 'SRM University Delhi-NCR Sonepat'],
    },
    {
      value: 'kurukshetra',
      label: 'Kurukshetra',
      colleges: ['NIT Kurukshetra', 'Kurukshetra University (KUK)', 'National Institute of Design (NID) Haryana'],
    },
    {
      value: 'faridabad',
      label: 'Faridabad',
      colleges: ['J.C. Bose University of Science and Technology (YMCA)', 'Manav Rachna International Institute of Research and Studies (MRIIRS)'],
    },
    {
      value: 'rohtak',
      label: 'Rohtak',
      colleges: ['IIM Rohtak', 'Maharshi Dayanand University (MDU)', 'Pt. B.D. Sharma PGIMS'],
    },
  ],

  GJ: [
    {
      value: 'ahmedabad',
      label: 'Ahmedabad',
      colleges: ['IIM Ahmedabad', 'CEPT University', 'Nirma University', 'Gujarat University', 'St. Xavier’s College Ahmedabad', 'Ahmedabad University'],
    },
    {
      value: 'gandhinagar',
      label: 'Gandhinagar',
      colleges: ['IIT Gandhinagar', 'DA-IICT', 'Pandit Deendayal Energy University (PDEU)', 'NIFT Gandhinagar', 'National Forensic Sciences University (NFSU)'],
    },
    {
      value: 'vadodara',
      label: 'Vadodara (Baroda)',
      colleges: ['Maharaja Sayajirao University of Baroda (MSU)', 'Parul University', 'Navrachana University'],
    },
    {
      value: 'surat',
      label: 'Surat',
      colleges: ['SVNIT Surat', 'Veer Narmad South Gujarat University (VNSGU)', 'Auro University'],
    },
  ],

  BR: [
    {
      value: 'patna',
      label: 'Patna',
      colleges: ['IIT Patna', 'NIT Patna', 'Patna University', 'AIIMS Patna', 'BIT Patna', 'Chanakya National Law University (CNLU)', 'NIFT Patna'],
    },
    {
      value: 'gaya',
      label: 'Gaya / Bodh Gaya',
      colleges: ['IIM Bodh Gaya', 'Central University of South Bihar (CUSB)', 'Gaya College of Engineering'],
    },
    {
      value: 'muzaffarpur',
      label: 'Muzaffarpur',
      colleges: ['Muzaffarpur Institute of Technology (MIT)', 'Babasaheb Bhimrao Ambedkar Bihar University (BRABU)'],
    },
    {
      value: 'bhagalpur',
      label: 'Bhagalpur',
      colleges: ['IIIT Bhagalpur', 'Tilka Manjhi Bhagalpur University (TMBU)', 'Bhagalpur College of Engineering (BCE)'],
    },
  ],

  TS: [
    {
      value: 'hyderabad',
      label: 'Hyderabad',
      colleges: ['IIT Hyderabad', 'IIIT Hyderabad', 'University of Hyderabad (HCU)', 'BITS Pilani Hyderabad Campus', 'Osmania University', 'ISB Hyderabad', 'CBIT Hyderabad'],
    },
    {
      value: 'warangal',
      label: 'Warangal',
      colleges: ['NIT Warangal', 'Kakatiya University', 'KITS Warangal'],
    },
  ],

  RJ: [
    {
      value: 'jaipur',
      label: 'Jaipur',
      colleges: ['MNIT Jaipur', 'The LNM Institute of Information Technology (LNMIIT)', 'Manipal University Jaipur (MUJ)', 'University of Rajasthan'],
    },
    {
      value: 'pilani',
      label: 'Pilani',
      colleges: ['BITS Pilani (Birla Institute of Technology and Science)'],
    },
    {
      value: 'jodhpur',
      label: 'Jodhpur',
      colleges: ['IIT Jodhpur', 'AIIMS Jodhpur', 'National Law University (NLU) Jodhpur', 'MBM University'],
    },
    {
      value: 'kota',
      label: 'Kota',
      colleges: ['Rajasthan Technical University (RTU)', 'IIIT Kota', 'Career Point University'],
    },
  ],

  PB: [
    {
      value: 'patiala-chandigarh',
      label: 'Patiala / Mohali / Chandigarh',
      colleges: ['Thapar Institute of Engineering and Technology (TIET)', 'Panjab University (PU)', 'PEC Chandigarh', 'IIT Ropar', 'ISB Mohali', 'Chitkara University'],
    },
    {
      value: 'jalandhar',
      label: 'Jalandhar',
      colleges: ['NIT Jalandhar', 'Lovely Professional University (LPU)', 'DAV Institute of Engineering and Technology'],
    },
    {
      value: 'amritsar',
      label: 'Amritsar',
      colleges: ['Guru Nanak Dev University (GNDU)', 'IIM Amritsar'],
    },
  ],

  KL: [
    {
      value: 'kochi',
      label: 'Kochi (Cochin)',
      colleges: ['Cochin University of Science and Technology (CUSAT)', 'Rajagiri College of Social Sciences', 'Model Engineering College'],
    },
    {
      value: 'thiruvananthapuram',
      label: 'Thiruvananthapuram (Trivandrum)',
      colleges: ['College of Engineering Trivandrum (CET)', 'IISER Thiruvananthapuram', 'University of Kerala', 'IIST'],
    },
    {
      value: 'kozhikode',
      label: 'Kozhikode (Calicut)',
      colleges: ['NIT Calicut', 'IIM Kozhikode', 'Government Engineering College Kozhikode'],
    },
  ],

  MP: [
    {
      value: 'indore',
      label: 'Indore',
      colleges: ['IIT Indore', 'IIM Indore', 'SGSITS Indore', 'Devi Ahilya Vishwavidyalaya (DAVV)'],
    },
    {
      value: 'bhopal',
      label: 'Bhopal',
      colleges: ['MANIT Bhopal', 'IISER Bhopal', 'National Law Institute University (NLIU)', 'AIIMS Bhopal', 'IIIT Bhopal'],
    },
    {
      value: 'gwalior',
      label: 'Gwalior',
      colleges: ['ABV-IIITM Gwalior', 'Jiwaji University'],
    },
  ],

  OD: [
    {
      value: 'bhubaneswar',
      label: 'Bhubaneswar',
      colleges: ['IIT Bhubaneswar', 'KIIT University', 'SOA University', 'NISER Bhubaneswar', 'AIIMS Bhubaneswar', 'Utkal University', 'IIIT Bhubaneswar'],
    },
    {
      value: 'rourkela',
      label: 'Rourkela',
      colleges: ['NIT Rourkela', 'Rourkela Institute of Management Studies'],
    },
  ],

  AP: [
    {
      value: 'visakhapatnam',
      label: 'Visakhapatnam (Vizag)',
      colleges: ['Andhra University', 'IIM Visakhapatnam', 'GITAM University'],
    },
    {
      value: 'vijayawada-amaravati',
      label: 'Vijayawada / Amaravati',
      colleges: ['SRM University AP', 'VIT-AP University', 'KL University', 'NIT Andhra Pradesh'],
    },
    {
      value: 'tirupati',
      label: 'Tirupati',
      colleges: ['IIT Tirupati', 'IISER Tirupati', 'Sri Venkateswara University (SVU)'],
    },
  ],

  AS: [
    {
      value: 'guwahati',
      label: 'Guwahati',
      colleges: ['IIT Guwahati', 'Gauhati University', 'Cotton University', 'Assam Engineering College', 'AIIMS Guwahati', 'IIIT Guwahati'],
    },
    {
      value: 'silchar',
      label: 'Silchar',
      colleges: ['NIT Silchar', 'Assam University'],
    },
  ],

  UK: [
    {
      value: 'dehradun',
      label: 'Dehradun',
      colleges: ['UPES Dehradun', 'Graphic Era University', 'DIT University', 'Forest Research Institute (FRI)'],
    },
    {
      value: 'roorkee',
      label: 'Roorkee',
      colleges: ['IIT Roorkee', 'College of Engineering Roorkee (COER)'],
    },
    {
      value: 'pantnagar',
      label: 'Pantnagar / Nainital',
      colleges: ['GBPUAT Pantnagar', 'Kumaun University'],
    },
  ],

  CH: [
    {
      value: 'chandigarh-city',
      label: 'Chandigarh (UT)',
      colleges: ['Panjab University', 'Punjab Engineering College (PEC)', 'Chandigarh University', 'Postgraduate Institute of Medical Education and Research (PGIMER)'],
    },
  ],

  GA: [
    {
      value: 'goa-central',
      label: 'Goa (Panaji / South Goa)',
      colleges: ['BITS Pilani K.K. Birla Goa Campus', 'IIT Goa', 'NIT Goa', 'Goa Institute of Management (GIM)', 'Goa University'],
    },
  ],
};

export const POPULAR_VIBES = [
  { id: 'tech', label: 'Tech & Startups', emoji: '💻' },
  { id: 'music', label: 'Live Concerts & Music', emoji: '🎧' },
  { id: 'nightlife', label: 'Nightlife & Parties', emoji: '🍸' },
  { id: 'coffee', label: 'Café Hopping & Chai', emoji: '☕' },
  { id: 'fitness', label: 'Gym, Running & Fitness', emoji: '🏃' },
  { id: 'art', label: 'Art, Design & Fashion', emoji: '🎨' },
  { id: 'gaming', label: 'Gaming & Esports', emoji: '🎮' },
  { id: 'foodie', label: 'Foodie & Street Food', emoji: '🍜' },
  { id: 'outdoors', label: 'Hiking & Treks', emoji: '🏔️' },
  { id: 'books', label: 'Book Clubs & Literature', emoji: '📚' },
  { id: 'cinema', label: 'Bollywood & Cinema', emoji: '🎬' },
  { id: 'travel', label: 'Road Trips & Travel', emoji: '✈️' },
];

export const PRONOUN_OPTIONS = [
  { value: 'she/her', label: 'She / Her' },
  { value: 'he/him', label: 'He / Him' },
  { value: 'they/them', label: 'They / Them' },
  { value: 'she/they', label: 'She / They' },
  { value: 'he/they', label: 'He / They' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];
