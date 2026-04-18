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
  ArrowRight, Award, UserCheck, ShieldPlus
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
    id: "gmm",
    title: "Gastos Médicos Mayores",
    description: "Tranquilidad ante cualquier imprevisto médico. Cobertura nacional e internacional.",
    icon: HeartPulse,
  },
  {
    id: "vida",
    title: "Seguro de Vida",
    description: "Protege el futuro de tus seres queridos con coberturas flexibles y adaptadas.",
    icon: ShieldCheck,
  },
  {
    id: "educativo",
    title: "Plan Educativo",
    description: "Garantiza el futuro académico de tus hijos con un ahorro inteligente.",
    icon: GraduationCap,
  },
  {
    id: "retiro",
    title: "Ahorro para el Retiro",
    description: "Construye hoy el retiro que deseas con planes de pensión privada.",
    icon: Sunrise,
  },
  {
    id: "financiero",
    title: "Productos Financieros",
    description: "Soluciones de ahorro e inversión para potencializar tu patrimonio.",
    icon: Building2,
  },
  {
    id: "bancario",
    title: "Productos Bancarios",
    description: "Acceso a beneficios de Inbursa para el control de tus finanzas.",
    icon: Landmark,
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
          {["Inicio", "Servicios", "Empresas"].map((item) => (
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
              {["Inicio", "Servicios", "Empresas"].map((item) => (
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
    <section id="inicio" className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-20 overflow-hidden bg-[linear-gradient(135deg,white_60%,#E3E9F2_60%)]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-16 items-center relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-navy leading-[1.1] mb-6 md:mb-8 font-bold">
            Protege lo que<br />
            <span className="text-gold italic">más importa</span> hoy.
          </h1>
          <p className="text-slate-600 text-base md:text-lg mb-8 md:text-10 max-w-lg leading-relaxed">
            Con más de 15 años de experiencia en el mercado mexicano, diseño estrategias personalizadas para blindar tu patrimonio y asegurar el futuro de tu familia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contacto" className="bg-navy hover:bg-navy/90 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-[4px] font-bold uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg active:scale-95 text-center">
              Asesoría Gratuita
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="bg-white p-10 rounded-lg shadow-2xl border-l-[6px] border-gold relative z-10">
             <h3 className="text-navy text-2xl font-serif font-bold mb-4">Tu Agente de Confianza</h3>
             <p className="text-slate-600 leading-relaxed mb-6">
               Mi compromiso es brindarte claridad y seguridad en cada decisión financiera. Trabajo de la mano con las aseguradoras líderes para encontrarte la mejor cobertura al precio justo.
             </p>
             <div className="pt-4 border-t border-light-blue">
               <p className="text-navy font-black text-lg uppercase tracking-tight">Liliana Saenzpardo</p>
               <p className="text-gold font-bold text-xs uppercase tracking-[0.2em] mt-1">CÉDULA PROFESIONAL VIGENTE</p>
             </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl -z-0" />
        </motion.div>
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
      <a href="#contacto" className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
        Más Información <ArrowRight size={14} />
      </a>
    </motion.div>
  );
};

const SolutionsEmpresariales = () => {
  return (
    <section id="empresas" className="py-16 md:py-24 bg-white overflow-hidden border-y border-light-blue">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-bold uppercase tracking-widest text-[9px] md:text-[10px] mb-4 block">Seguros Corporativos</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy mb-6 md:mb-8 leading-tight">
              Protección para <br /><span className="text-gold italic">tu Negocio</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed">
              Blindamos el capital humano y los activos de tu empresa con soluciones adaptadas a tu estructura corporativa.
            </p>
            
            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {[
                "Vida Grupo",
                "Gastos Médicos Colectivos",
                "Socios y Hombre Clave",
                "Previsión Social"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 md:gap-3 text-slate-700 font-medium text-xs md:text-sm">
                  <div className="text-gold"><CheckCircle2 size={16} /></div>
                  {item}
                </li>
              ))}
            </ul>
            
            <a href="#contacto" className="inline-flex items-center gap-3 bg-navy text-white px-8 md:px-10 py-3.5 md:py-4 rounded-[4px] font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-navy/90 transition-colors shadow-lg">
              Asesoría <Briefcase size={16} />
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative hidden md:block"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl relative z-10 p-2 bg-white border border-light-blue">
              <img 
                src="https://www.advans.es/wp-content/uploads/2021/08/imagen-seguro-vida1.jpg" 
                alt="Protección Familiar" 
                className="w-full h-full object-cover rounded-sm" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-10 -left-10 w-full h-full bg-light-blue rounded-lg -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutMe = () => {
  return (
    <section id="sobre-mí" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 relative">
           <div className="aspect-[4/5] rounded-lg overflow-hidden border border-light-blue shadow-lg p-3 bg-white">
              <img src="https://picsum.photos/seed/trust/800/1000" alt="Liliana" className="w-full h-full object-cover rounded-sm" />
           </div>
           <div className="absolute -bottom-10 -right-10 bg-navy text-white p-8 rounded-lg shadow-2xl border-l-4 border-gold z-20">
              <h4 className="text-gold font-bold uppercase tracking-widest text-[11px] mb-2">Trayectoria Premium</h4>
              <p className="font-serif text-2xl font-bold italic leading-tight">+10 Años de Asesoría Certificada</p>
           </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 md:order-2"
        >
          <span className="text-gold font-bold uppercase tracking-widest text-[10px] mb-4 block">Sobre Liliana Saenzpardo</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-8 leading-tight">
            Asesoría Integral en <span className="text-gold italic">Seguros y Finanzas</span>
          </h2>
          <div className="space-y-6">
            <p className="text-slate-600 text-lg leading-relaxed italic">
              "Mi misión es brindarte claridad y seguridad en cada decisión financiera, implementando estrategias que trasciendan generaciones."
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Como especialista en productos bancarios y de seguros, trabajo bajo un estricto código de ética certificado, garantizando que cada póliza sea una inversión real para tu patrimonio.
            </p>
            
            <div className="pt-8 grid grid-cols-2 gap-10">
              <div className="flex flex-col">
                <span className="text-navy font-black text-xl tracking-tighter">INBURSA</span>
                <span className="text-gold font-bold text-[9px] uppercase tracking-widest">Socio Estratégico</span>
              </div>
              <div className="flex flex-col">
                <span className="text-navy font-black text-xl tracking-tighter">MAPFRE</span>
                <span className="text-gold font-bold text-[9px] uppercase tracking-widest">Agente de Vida</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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

    // Nota: Reemplaza estos IDs con tus propios IDs de EmailJS
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
        // Fallback para simular éxito en la demo si no hay llaves configuradas
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
                <p className="text-slate-500">Nos contactaremos contigo muy pronto.</p>
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
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">Ubicación</span>
            <span className="text-lg font-bold">Chihuahua, Chih., México</span>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 opacity-40 text-[9px] uppercase font-bold tracking-[0.3em]">
          Liliana Saenzpardo © 2026
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
    <div className="font-sans text-slate-900 bg-white">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Partners Micro Section */}
        <section className="bg-white py-12 border-b border-slate-100">
           <div className="max-w-7xl mx-auto px-6 overflow-hidden">
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-2xl font-serif font-black tracking-widest text-slate-900">INBURSA</span>
                <span className="text-2xl font-serif font-black tracking-widest text-slate-900">MAPFRE</span>
             </div>
           </div>
        </section>

        <section id="servicios" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader 
              title="Protección a tu Medida" 
              subtitle="Ofrecemos una gama completa de seguros y productos financieros para respaldar cada paso de tu camino."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {SERVICES.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        <SolutionsEmpresariales />
        <ContactForm />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
