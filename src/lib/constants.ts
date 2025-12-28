export const KENYA_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho",
  "Bomet", "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya",
  "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

export const LOAN_TYPES = [
  { value: "personal", label: "Personal Loan" },
  { value: "business", label: "Business Loan" },
  { value: "education", label: "Education Loan" },
  { value: "agricultural", label: "Agricultural Loan" },
];

export const LOAN_AMOUNTS = [
  2000, 3500, 5000, 6500, 8000, 10000, 12500, 14000, 16000, 20000, 36000, 50000
];

export const EMPLOYMENT_STATUS = [
  { value: "employed", label: "Employed" },
  { value: "self-employed", label: "Self-Employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "student", label: "Student" },
];

export const INCOME_RANGES = [
  { value: "0-10000", label: "0 to 10,000" },
  { value: "10001-25000", label: "10,001 to 25,000" },
  { value: "25001-50000", label: "25,001 to 50,000" },
  { value: "50001+", label: "50,001 and above" },
];

export const LOAN_TERMS = [3, 6, 12, 18, 24];

export const LOAN_PRODUCTS = [
  {
    type: "personal",
    title: "Personal Loans",
    description: "Get funds for personal expenses, education, medical bills, or home improvements with flexible repayment terms.",
    icon: "Home",
    minAmount: 5000,
    maxAmount: 50000,
    minTerm: 3,
    maxTerm: 24,
    interestRate: 12,
  },
  {
    type: "business",
    title: "Business Loans",
    description: "Grow your business with our tailored financing solutions for startups, expansion, or working capital.",
    icon: "Briefcase",
    minAmount: 5000,
    maxAmount: 50000,
    minTerm: 6,
    maxTerm: 36,
    interestRate: 10,
  },
  {
    type: "education",
    title: "Education Loans",
    description: "Invest in your future with our education loans covering tuition, books, and living expenses.",
    icon: "GraduationCap",
    minAmount: 5000,
    maxAmount: 50000,
    minTerm: 12,
    maxTerm: 48,
    interestRate: 8,
  },
  {
    type: "agricultural",
    title: "Agricultural Loans",
    description: "Support your farming activities with loans for equipment, seeds, livestock, and farm expansion.",
    icon: "Tractor",
    minAmount: 5000,
    maxAmount: 50000,
    minTerm: 6,
    maxTerm: 24,
    interestRate: 9,
  },
];

export const TESTIMONIALS = [
  {
    quote: "Nyota Fund helped me expand my small business when no other lender would. The process was quick and the staff was very helpful. I received the funds in my account within 3 hours of approval!",
    author: "Jane Wanjiku",
    location: "Nairobi",
  },
  {
    quote: "I needed funds for my daughter's university education. Nyota Fund provided a loan with reasonable terms that made it possible. The flexible repayment options have been a lifesaver for our family.",
    author: "David Ochieng",
    location: "Kisumu",
  },
  {
    quote: "The agricultural loan I received helped me purchase better seeds and equipment. My harvest has doubled this season! I'm now able to support my family and even hire two additional workers.",
    author: "Mary Atieno",
    location: "Nakuru",
  },
  {
    quote: "As a young entrepreneur, getting funding was challenging until I found Nyota Fund. They believed in my business idea and provided the capital I needed to get started. Highly recommended!",
    author: "Brian Kamau",
    location: "Mombasa",
  },
  {
    quote: "When medical bills were piling up, Nyota Fund came through with a personal loan that saved us. The application was simple and the customer service was exceptional throughout the process.",
    author: "Grace Auma",
    location: "Eldoret",
  },
  {
    quote: "I've taken three loans from Nyota Fund over the years for my retail business. Each time the process gets smoother. Their loyalty program with reduced interest rates for returning customers is fantastic.",
    author: "Samuel Njoroge",
    location: "Thika",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Apply Online",
    description: "Fill out our simple online application form with your personal and financial details. It takes less than 10 minutes to complete.",
  },
  {
    step: 2,
    title: "Get Approved",
    description: "Our team will review your application and provide approval within 24 hours. We have a 95% approval rate for qualified applicants.",
  },
  {
    step: 3,
    title: "Receive Funds",
    description: "Once approved, the funds will be disbursed directly to your bank account or M-Pesa within 2 hours of approval.",
  },
  {
    step: 4,
    title: "Repay Easily",
    description: "Make convenient repayments through mobile banking, bank transfer, or M-Pesa. Set up automatic payments for hassle-free repayment.",
  },
];
