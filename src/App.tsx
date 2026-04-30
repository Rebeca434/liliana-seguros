/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { useState, useEffect, useRef, type ElementType, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { 
  HeartPulse, ShieldCheck, GraduationCap, Sunrise, Briefcase, 
  Building2, Landmark, MessageCircle, Phone, Mail, 
  Facebook, Instagram, Menu, X, CheckCircle2, ChevronRight, Send,
  ArrowRight, Award, UserCheck, ShieldPlus, Stethoscope, Activity,
  FileCheck, ClipboardList, Scale, Info, Calendar, ChevronDown, ExternalLink,
  MapPin, Clock, Search
} from "lucide-react";

// --- Types ---

interface Service {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

// --- Constants ---

const SERVICES: Service[] = [
  {
    id: "vida",
    title: "Seguro de Vida",
    description: "Asegura el bienestar de los tuyos con planes de vida diseñados a tu medida.",
    icon: ShieldCheck,
  },
  {
    id: "retiro",
    title: "Ahorro para el Retiro",
    description: "Construye hoy la libertad financiera que deseas para tu futuro.",
    icon: Sunrise,
  },
  {
    id: "educativo",
    title: "Plan Educativo",
    description: "Garantiza la educación superior de tus hijos con previsión hoy.",
    icon: GraduationCap,
  },
  {
    id: "financieros",
    title: "Productos Financieros",
    description: "Soluciones de inversión y ahorro para hacer crecer tu capital.",
    icon: Landmark,
  },
  {
    id: "bancarios",
    title: "Productos Bancarios",
    description: "Servicios financieros integrales respaldados por instituciones líderes.",
    icon: Building2,
  },
  {
    id: "empresas",
    title: "Seguros Corporativos",
    description: "Protección integral para el capital humano y activos de tu negocio.",
    icon: Briefcase,
  },
];

const COMPANIES = [
  { name: "Inbursa", logo: "https://picsum.photos/seed/inbursa/300/150?blur=10" },
  { name: "Mapfre", logo: "https://picsum.photos/seed/mapfre/300/150?blur=10" },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white border-b border-light-blue py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img 
            src="https://i.imgur.com/EwMzzqn.png" 
            alt="Logo" 
            className="w-12 h-12 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className={`font-serif text-xl font-bold tracking-tight leading-none ${isScrolled ? "text-navy" : "text-white"}`}>
              Liliana Saenzpardo
            </span>
            <span className={`text-[9px] font-bold tracking-[0.15em] mt-1 ${isScrolled ? "text-gold" : "text-gold"}`}>
              ASESORÍA FINANCIERA INTEGRAL
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {["Inicio", "Servicios"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
              className={`text-[13px] font-bold uppercase tracking-wider hover:text-gold transition-colors ${isScrolled ? "text-navy" : "text-white"}`}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contacto" 
            className="bg-navy border border-gold hover:bg-gold hover:text-navy text-white px-6 py-2.5 rounded-[4px] text-xs font-bold uppercase tracking-widest transition-all active:scale-95"
          >
            Contacto
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-blue-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu className={isScrolled ? "text-blue-600" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b absolute top-full left-0 w-full overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {["Inicio", "Servicios"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-navy hover:text-gold font-bold uppercase text-sm tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contacto" 
                className="bg-navy border border-gold text-white px-6 py-3 rounded-sm text-center font-bold uppercase tracking-widest text-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-20 overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_60%,#F8FAFC_60%)]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-16 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-navy leading-[1.1] mb-6 md:mb-8 font-bold">
            Tu tranquilidad,<br />
            <span className="text-gold italic">nuestra prioridad</span> médica.
          </h1>
          <p className="text-slate-600 text-base md:text-lg mb-8 md:text-10 max-w-lg leading-relaxed">
            Diseño estrategias de Seguros de Gastos Médicos Mayores para que tú y tu familia tengan acceso a la mejor atención privada sin comprometer su patrimonio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#calendario" className="bg-navy hover:bg-navy/90 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-[4px] font-bold uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg active:scale-95 text-center">
              Agenda asesoría gratuita
            </a>
            <a href="#gmm-detalles" className="border border-navy text-navy px-8 md:px-10 py-3.5 md:py-4 rounded-[4px] font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-navy hover:text-white transition-all text-center">
              Saber más
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative group overflow-hidden rounded-2xl">
            <img 
              src="https://i.imgur.com/VDtjQCR.png" 
              alt="Liliana Saenzpardo" 
              className="w-full h-auto object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Professional Floating Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl z-20 border-l-[6px] border-gold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
               <p className="text-navy font-black text-lg uppercase tracking-tight">Liliana Saenzpardo</p>
               <div className="flex items-center gap-2 mt-1">
                 <Award size={14} className="text-gold" />
                 <p className="text-gold font-bold text-[10px] uppercase tracking-[0.2em]">Cédula Profesional Vigente</p>
               </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl -z-0" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-navy/5 rounded-full blur-3xl -z-0" />
        </motion.div>
      </div>
    </section>
  );
};

const SectionSGMMIntro = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="gmm-detalles" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto overflow-hidden">
            <img 
              src="https://www.advans.es/wp-content/uploads/2021/08/imagen-seguro-vida1.jpg" 
              alt="Seguro de Gastos Médicos Mayores" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-navy/20" />
          </div>
          <div className="p-8 md:p-16 flex flex-col justify-center items-start">
            <span className="text-gold font-bold uppercase tracking-widest text-[10px] mb-4">Servicio Destacado</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-8 leading-tight">
              Seguro de Gastos <br /><span className="text-gold italic">Médicos Mayores</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
              Accede a hospitales privados y médicos de la red contratada sin poner en riesgo tu patrimonio o el de tu familia ante cualquier percance de salud.
            </p>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-navy text-white px-10 py-4 rounded-[4px] font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-navy transition-all shadow-lg active:scale-95"
            >
              Saber más
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Expanded Section */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy/90 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-8 md:p-12 relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-navy p-2 bg-slate-100 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="max-w-2xl">
                <h3 className="text-3xl font-serif font-bold text-navy mb-6">
                  ¿Qué es el Seguro de Gastos Médicos Mayores?
                </h3>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                  Están diseñados para brindar certidumbre al momento de enfrentar un evento que ponga en riesgo nuestra salud. Al contar con este plan, tendrás acceso a diferentes servicios y hasta la suma asegurada sin poner en riesgo el patrimonio familiar.
                </p>

                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {[
                    "Deducible",
                    "Coaseguro",
                    "Nivel hospitalario",
                    "Suma asegurada",
                    "Honorarios quirúrgicos",
                    "Exención de deducible por accidente o emergencia en el extranjero"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100 border-l-4 border-l-gold">
                      <div className="mt-1 text-navy shrink-0"><CheckCircle2 size={20} /></div>
                      <span className="font-bold text-navy text-sm leading-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a href="#contacto" onClick={() => setShowModal(false)} className="bg-navy text-white px-8 py-4 rounded-[4px] font-bold uppercase tracking-widest text-xs">
                    Cotizar ahora
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const RequirementsSection = () => {
  const reqs = [
    { title: "RFC y CURP", icon: FileCheck },
    { title: "INE vigente", icon: Award },
    { title: "Cuestionario de salud", icon: ClipboardList },
    { title: "Peso y estatura", icon: Scale },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader 
          title="Requisitos para solicitar" 
          subtitle="Proceso simplificado y transparente para asegurar tu bienestar financiero y médico."
        />
        <h3 className="text-center font-serif text-xl italic text-slate-500 mb-12 -mt-10">un Seguro de Gastos Médicos Mayores</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reqs.map((req, i) => (
            <div key={i} className="group p-8 rounded-xl border border-slate-100 hover:border-gold/30 hover:shadow-xl transition-all duration-300 text-center bg-slate-50">
              <div className="w-16 h-16 mx-auto mb-6 bg-white rounded-full flex items-center justify-center text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-all">
                <req.icon size={28} />
              </div>
              <p className="font-bold text-navy uppercase tracking-widest text-xs leading-relaxed">{req.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { title: "Encuentra la cobertura adecuada", icon: Search, color: "bg-blue-600" },
    { title: "Cotiza entre las mejores aseguradoras", icon: Landmark, color: "bg-navy" },
    { title: "Recibe asesoría sin costo", icon: UserCheck, color: "bg-gold" },
    { title: "Contrata sin complicaciones", icon: FileCheck, color: "bg-blue-800" },
    { title: "Vive tranquilo y protegido", icon: HeartPulse, color: "bg-green-600" },
  ];

  return (
    <section className="py-24 bg-navy overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader 
          title="Nuestro proceso es simple" 
          subtitle="Pasos claros y directos para que obtengas la mejor protección sin complicaciones."
          light
        />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 pt-12">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-6 w-full max-w-[200px] text-center group">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white relative shadow-lg ${step.color} transition-transform group-hover:scale-110 duration-500`}>
                  <step.icon size={32} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-navy font-black rounded-full flex items-center justify-center border-2 border-navy shadow-md">
                    {i + 1}
                  </div>
                </div>
                <p className="text-white font-bold text-[11px] uppercase tracking-widest leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                  {step.title}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block h-[1px] w-full bg-gold/30" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Cuáles son los tipos de seguros de Gastos Médicos Mayores?",
      a: "Existen diversos planes adaptados a distintas necesidades: planes básicos integrales, planes de cobertura internacional, planes con acceso a hospitales específicos de alto nivel y planes complementarios para quienes ya cuentan con una cobertura laboral."
    },
    {
      q: "¿De qué depende el costo del Seguro de Gastos Médicos Mayores (SGMM)?",
      a: "El costo se determina principalmente por la edad del asegurado, género, zona geográfica de residencia, nivel hospitalario elegido, monto del deducible y coaseguro, e inclusones adicionales seleccionadas."
    },
    {
      q: "¿Existen restricciones al contratar un SGMM?",
      a: "Sí, las aseguradoras consideran padecimientos preexistentes (enfermedades diagnosticadas previo a la contratación), periodos de espera para ciertos tratamientos (como maternidad o cirugías específicas) y límites de edad para la contratación inicial."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader 
          title="Preguntas frecuentes" 
          subtitle="Resolvemos tus dudas sobre el Seguro de Gastos Médicos Mayores."
        />
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-lg overflow-hidden transition-all">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-all group"
              >
                <span className="font-bold text-navy text-sm md:text-base leading-tight pr-4">{faq.q}</span>
                <ChevronDown className={`shrink-0 text-gold transition-transform duration-300 ${active === i ? "rotate-180" : ""}`} size={20} />
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
    <h2 className={`text-2xl md:text-5xl font-serif font-bold mb-4 md:mb-6 uppercase tracking-tight ${light ? "text-white" : "text-navy"}`}>
      {title}
    </h2>
    <div className={`h-1 w-16 md:w-20 bg-gold mx-auto mb-4 md:mb-6`} />
    <p className={`text-sm md:text-base leading-relaxed ${light ? "text-slate-400" : "text-slate-500"}`}>
      {subtitle}
    </p>
  </div>
);

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const Icon = service.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-lg border border-light-blue hover:border-gold group transition-all duration-300 shadow-sm"
    >
      <div className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      <h3 className="text-[15px] font-bold text-navy mb-3 uppercase tracking-wider">{service.title}</h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-6">{service.description}</p>
      <a 
        href={service.id === 'gmm' ? "#gmm-detalles" : "#contacto"} 
        className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors"
      >
        Más Información <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_default";
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_test";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch((error) => {
        console.error("Error al enviar el correo:", error);
        setSubmitted(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-navy font-bold mb-8 leading-tight">
              ¿Hablamos sobre tu <span className="text-gold italic">futuro financiero?</span>
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Déjanos tus datos y nos pondremos en contacto contigo lo antes posible para una asesoría personalizada sin costo.
            </p>
            
            <div className="space-y-6">
               <div id="calendario" className="p-8 rounded-lg bg-gold/5 border border-gold/20 mb-8">
                  <h4 className="text-navy font-bold text-lg mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-gold" />
                    Agenda una asesoría gratuita
                  </h4>
                  <p className="text-slate-600 text-sm mb-6">Elige el mejor momento para platicar sobre tu plan de protección médica.</p>
                  <a 
                    href="https://calendly.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-[4px] font-bold uppercase tracking-widest text-[10px] hover:bg-gold hover:text-navy transition-all"
                  >
                    Ver Calendario <ExternalLink size={14} />
                  </a>
               </div>

               <div className="flex items-center gap-6 group border-b border-light-blue pb-6">
                 <div className="w-12 h-12 bg-light-blue text-navy rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                 </div>
                 <div>
                   <p className="text-gold text-[10px] font-bold uppercase tracking-widest">Atención Telefónica</p>
                   <p className="text-navy text-xl font-bold tracking-tight">614 127 6470</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-6 group border-b border-light-blue pb-6">
                 <div className="w-12 h-12 bg-light-blue text-navy rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                 </div>
                 <div>
                   <p className="text-gold text-[10px] font-bold uppercase tracking-widest">E-mail Corporativo</p>
                   <p className="text-navy text-xl font-bold tracking-tight">lilianas@smnyl.com</p>
                 </div>
               </div>

               <div className="flex items-center gap-4 pt-4">
                 <a href="https://facebook.com/LilianaSaenzPardoSeguros" target="_blank" className="w-10 h-10 bg-navy rounded-sm flex items-center justify-center text-white hover:bg-gold hover:text-navy transition-all">
                   <Facebook size={18} />
                 </a>
                 <a href="https://instagram.com/LilianaSaenzPardo" target="_blank" className="w-10 h-10 bg-navy rounded-sm flex items-center justify-center text-white hover:bg-gold hover:text-navy transition-all">
                   <Instagram size={18} />
                 </a>
                 <a href="https://wa.me/526141276470" target="_blank" className="bg-navy border border-gold text-white px-8 py-3 rounded-[4px] font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-gold hover:text-navy transition-all">
                    <MessageCircle size={18} /> WhatsApp
                 </a>
               </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-lg shadow-2xl border border-light-blue relative overflow-hidden">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2 uppercase tracking-tight">¡Solicitud Enviada!</h3>
                <p className="text-slate-500">Nos contactaremos contigo en menos de 24 horas.</p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-2 uppercase tracking-widest">Nombre Completo</label>
                  <input required name="user_name" type="text" placeholder="Tu nombre" className="w-full px-5 py-3 rounded-sm border border-light-blue focus:outline-none focus:border-gold transition-all font-medium text-slate-900" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-navy mb-2 uppercase tracking-widest">E-mail</label>
                    <input required name="user_email" type="email" placeholder="correo@ejemplo.com" className="w-full px-5 py-3 rounded-sm border border-light-blue focus:outline-none focus:border-gold transition-all font-medium text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-navy mb-2 uppercase tracking-widest">WhatsApp</label>
                    <input required name="user_phone" type="tel" placeholder="10 dígitos" className="w-full px-5 py-3 rounded-sm border border-light-blue focus:outline-none focus:border-gold transition-all font-medium text-slate-900" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-2 uppercase tracking-widest">Interés Principal</label>
                  <select name="service_interest" className="w-full px-5 py-3 rounded-sm border border-light-blue focus:outline-none focus:border-gold transition-all font-medium text-slate-900 bg-white">
                    <option>Gastos Médicos Mayores</option>
                    <option>Seguro de Vida</option>
                    <option>Retiro / Ahorro</option>
                    <option>Seguro Educativo</option>
                    <option>Empresas / Grupos</option>
                    <option>Otro (escribe tu mensaje abajo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-2 uppercase tracking-widest">Mensaje</label>
                  <textarea name="message" rows={3} placeholder="Escribe tu mensaje aquí..." className="w-full px-5 py-3 rounded-sm border border-light-blue focus:outline-none focus:border-gold transition-all font-medium text-slate-900 resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-navy text-white py-5 rounded-[4px] font-bold uppercase tracking-widest text-sm hover:bg-navy/90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-8 border-t border-gold text-center md:text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex gap-6">
              <a href="https://facebook.com/LilianaSaenzPardoSeguros" target="_blank" className="text-white hover:text-gold transition-colors opacity-80 hover:opacity-100"><Facebook size={24} /></a>
              <a href="https://instagram.com/LilianaSaenzPardo" target="_blank" className="text-white hover:text-gold transition-colors opacity-80 hover:opacity-100"><Instagram size={24} /></a>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">WhatsApp Directo</span>
              <span className="text-lg font-bold text-gold">614 127 6470</span>
            </div>
          </div>
          
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Ubicación</span>
              <span className="text-xs md:text-sm font-bold text-white max-w-[200px] leading-relaxed">
                BLVRD Antonio Ortiz Mena 200, San Felipe II Etapa, 33130 Chihuahua, Chih.
              </span>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gold/10 rounded-full text-gold">
                <Award size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Cédula Profesional Vigente</p>
                <a href="#" className="text-xs font-bold hover:text-gold transition-colors flex items-center gap-1">Ver Cédula <ExternalLink size={10} /></a>
              </div>
            </div>
            <div className="opacity-40 text-[9px] uppercase font-bold tracking-[0.3em]">
              Liliana Saenzpardo © 2026
            </div>
          </div>
        </div>
      </footer>
  );
};

const WhatsAppButton = () => (
   <a 
     href="https://wa.me/526141276470" 
     target="_blank" 
     rel="noopener noreferrer"
     className="fixed bottom-8 right-8 z-50 bg-navy border border-gold text-gold w-14 h-14 rounded-sm flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all"
   >
     <MessageCircle size={24} />
   </a>
);

// --- Main App ---

export default function App() {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-gold/30">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Partners Micro Section */}
        <section className="bg-white py-12 border-b border-slate-100">
           <div className="max-w-7xl mx-auto px-6 overflow-hidden text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Respaldada por las mejores aseguradoras de México</p>
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-2xl font-serif font-black tracking-widest text-slate-900">INBURSA</span>
                <span className="text-2xl font-serif font-black tracking-widest text-slate-900">MAPFRE</span>
             </div>
           </div>
        </section>

        <SectionSGMMIntro />
        <RequirementsSection />

        <section id="servicios" className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="Portafolio Integral" 
              subtitle="Aunque nos especializamos en salud, ofrecemos soluciones completas para todas las etapas de tu vida."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />
        <FAQSection />
        <ContactForm />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
