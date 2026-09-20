import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Hammer,
  House,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Ruler,
  Send,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();
const WHATSAPP_NUMBER = '56912345678'; // REEMPLAZAR: número real de WhatsApp, sin signos ni espacios.
const DISPLAY_PHONE = '+56 9 1234 5678'; // REEMPLAZAR: teléfono visible del maestro.
const LOCATION_COPY = 'Santiago y comunas cercanas'; // REEMPLAZAR: zona de atención real.
const whatsappLink = (message = 'Hola, quisiera conversar sobre una remodelación.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/galeria', label: 'Antes / Después' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/precios', label: 'Precios' },
  { href: '/contacto', label: 'Contacto' },
];

function WhatsAppAction({ label = 'Hablar por WhatsApp', className = '' }: { label?: string; className?: string }) {
  return (
    <a
      data-testid="link-whatsapp-action"
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--rust)] px-5 py-3 text-sm font-semibold text-[var(--paper)] transition hover:bg-[var(--wood)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] ${className}`}
    >
      <MessageCircle size={16} strokeWidth={2} />
      {label}
      <ArrowUpRight size={15} />
    </a>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [location]);
  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(47,41,35,.13)] bg-[rgba(246,241,232,.94)] backdrop-blur-md">
      <div className="page-wrap flex h-[76px] items-center justify-between">
        <Link href="/" data-testid="link-brand" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-[var(--ink)] text-[var(--gold)] transition group-hover:bg-[var(--rust)]">
            <Hammer size={19} strokeWidth={1.7} />
          </span>
          <span>
            <span className="display-font block text-lg leading-none font-bold tracking-tight">Oficio Norte</span>
            <span className="eyebrow mt-1 block text-[var(--steel)]">Remodelaciones</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="nav-link text-[13px] font-semibold text-[var(--ink)]" data-active={location === item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="mono-font text-[11px] text-[var(--steel)]">{DISPLAY_PHONE}</span>
          <WhatsAppAction label="Cotizar" className="px-4 py-2.5 text-xs" />
        </div>
        <button data-testid="button-open-menu" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center border border-[rgba(47,41,35,.2)] lg:hidden">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[rgba(47,41,35,.13)] bg-[var(--paper)] px-4 py-5 lg:hidden">
          <nav className="page-wrap grid gap-1" aria-label="Navegación móvil">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="flex items-center justify-between border-b border-[rgba(47,41,35,.12)] py-3 text-base font-semibold">
                {item.label}<ChevronRight size={16} className="text-[var(--rust)]" />
              </Link>
            ))}
            <WhatsAppAction label="Escribir por WhatsApp" className="mt-4 w-full" />
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)]">
      <div className="page-wrap grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-[var(--gold)] text-[var(--ink)]"><Hammer size={18} /></span>
            <span className="display-font text-xl font-bold">Oficio Norte</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[rgba(246,241,232,.65)]">Remodelaciones con oficio, conversación clara y una casa que vuelve a sentirse propia.</p>
          <a data-testid="link-footer-instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--gold)] hover:text-[var(--paper)]"><Instagram size={16} /> Ver trabajos en Instagram</a>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold)]">Explorar</p>
          <div className="mt-5 grid gap-3 text-sm text-[rgba(246,241,232,.7)]">
            {navItems.slice(1).map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase().replaceAll(' ', '-')}`} className="transition hover:text-[var(--gold)]">{item.label}</Link>)}
          </div>
        </div>
        <div>
          <p className="eyebrow text-[var(--gold)]">Conversemos</p>
          <div className="mt-5 grid gap-3 text-sm text-[rgba(246,241,232,.7)]">
            <a data-testid="link-footer-phone" href={`tel:${DISPLAY_PHONE.replaceAll(' ', '')}`} className="flex items-center gap-2 hover:text-[var(--gold)]"><Phone size={15} /> {DISPLAY_PHONE}</a>
            <a data-testid="link-footer-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[var(--gold)]"><MessageCircle size={15} /> WhatsApp directo</a>
            <span data-testid="text-footer-location" className="flex items-center gap-2"><MapPin size={15} /> {LOCATION_COPY}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(246,241,232,.15)]">
        <div className="page-wrap flex flex-col gap-2 py-5 text-[11px] text-[rgba(246,241,232,.48)] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2024 Oficio Norte. Trabajo bien hecho, desde el primer mensaje.</span>
          <span className="mono-font">SANTIAGO · CHILE</span>
        </div>
      </div>
    </footer>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return <div className="site-shell grain min-h-[100dvh]">{children}</div>;
}

function SectionHeading({ kicker, title, body, light = false }: { kicker: string; title: string; body?: string; light?: boolean }) {
  return (
    <div className={light ? 'text-[var(--paper)]' : ''}>
      <p className={`eyebrow ${light ? 'text-[var(--gold)]' : 'text-[var(--rust)]'}`}>{kicker}</p>
      <h2 className="display-font mt-3 max-w-2xl text-4xl leading-[1.02] font-semibold tracking-[-.035em] md:text-6xl">{title}</h2>
      {body && <p className={`mt-5 max-w-lg text-base leading-7 ${light ? 'text-[rgba(246,241,232,.7)]' : 'text-[var(--steel)]'}`}>{body}</p>}
    </div>
  );
}

function Home() {
  return (
    <PageShell>
      <Header />
      <main>
        <section className="hero-grid overflow-hidden">
          <div className="page-wrap grid min-h-[680px] items-center gap-12 py-16 md:grid-cols-[.9fr_1.1fr] md:py-24">
            <div className="reveal">
              <p className="eyebrow flex items-center gap-3 text-[var(--rust)]"><span className="h-px w-8 bg-[var(--rust)]" /> Maestro constructor · Santiago</p>
              <h1 data-testid="text-home-hero" className="display-font mt-6 max-w-xl text-[clamp(3.5rem,8vw,7.6rem)] leading-[.88] font-semibold tracking-[-.06em]">Una casa que <em className="text-[var(--rust)]">vuelve</em> a ser tuya.</h1>
              <p className="mt-8 max-w-md text-lg leading-8 text-[var(--steel)]">Remodelamos espacios vividos para hacerlos más cálidos, prácticos y duraderos. Sin letras chicas. Con alguien responsable al otro lado.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <WhatsAppAction label="Cuéntame tu idea" />
                <Link href="/galeria" data-testid="link-hero-gallery" className="group inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-sm font-semibold">Ver proyectos <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              </div>
              <div className="mt-14 flex items-center gap-4 text-xs text-[var(--steel)]">
                <span className="flex -space-x-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[var(--wood)] text-[10px] text-[var(--paper)]">MP</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[var(--steel)] text-[10px] text-[var(--paper)]">AV</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--paper)] bg-[var(--rust)] text-[10px] text-[var(--paper)]">JC</span>
                </span>
                <span><strong className="text-[var(--ink)]">Familias que recomiendan</strong><br />en Santiago y alrededores</span>
              </div>
            </div>
            <div className="reveal reveal-delay-2 relative">
              <div className="image-sheen relative aspect-[.83] overflow-hidden bg-[var(--wood)] md:aspect-[.9]">
                {/* REEMPLAZAR: fotografía principal por una obra real del maestro. */}
                <img data-testid="img-home-hero" src="/images/hero-kitchen.jpg" alt="Cocina cálida remodelada con madera y cerámica" className="h-full w-full object-cover" />
                <div className="absolute bottom-5 left-5 z-10 max-w-[190px] border-l-2 border-[var(--gold)] pl-4 text-[var(--paper)]">
                  <p className="eyebrow text-[var(--gold)]">La Florida · 2024</p>
                  <p className="mt-2 text-sm leading-5">Cocina familiar, hecha para quedarse.</p>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-5 hidden h-28 w-28 bg-[var(--gold)] p-4 md:block">
                <Ruler size={25} className="text-[var(--ink)]" />
                <span className="eyebrow mt-4 block text-[var(--ink)]">Desde el oficio</span>
              </div>
            </div>
          </div>
          <div className="border-t border-[rgba(47,41,35,.16)]">
            <div className="page-wrap grid grid-cols-2 divide-x divide-[rgba(47,41,35,.16)] md:grid-cols-4">
              {[['12+', 'años de experiencia'], ['120', 'hogares transformados'], ['1', 'maestro responsable'], ['100%', 'conversación directa']].map(([number, label]) => (
                <div key={label} className="py-6 pl-4 first:pl-0 md:py-8 md:pl-8">
                  <strong className="display-font text-3xl">{number}</strong><span className="mt-1 block text-xs text-[var(--steel)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-wrap py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:items-end">
            <SectionHeading kicker="Lo que hacemos" title="Ordenar lo difícil. Disfrutar el resultado." body="Nos hacemos cargo de la obra completa o de esa parte que lleva meses esperando. Tú sabes qué pasa y cuándo." />
            <div className="grid gap-px bg-[rgba(47,41,35,.16)] sm:grid-cols-2">
              {[
                { icon: <House size={22} />, title: 'Cocinas que trabajan', body: 'Distribución, muebles, cubiertas, iluminación y terminaciones para cocinar con ganas.' },
                { icon: <Wrench size={22} />, title: 'Baños bien resueltos', body: 'Impermeabilización, cerámica y detalles precisos en espacios que tienen que durar.' },
                { icon: <Ruler size={22} />, title: 'Obra a medida', body: 'Closets, quinchos, ampliaciones y soluciones para esa esquina que nadie más entiende.' },
                { icon: <Sparkles size={22} />, title: 'Terminaciones', body: 'Pintura, pisos, puertas y reparaciones que devuelven dignidad a una casa.' },
              ].map((service, index) => (
                <div key={service.title} className="lift bg-[var(--paper)] p-7 md:p-8">
                  <div className="flex items-start justify-between text-[var(--rust)]"><span>{service.icon}</span><span className="project-number">0{index + 1}</span></div>
                  <h3 className="display-font mt-12 text-2xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--steel)]">{service.body}</p>
                  <Link href="/servicios" data-testid={`link-service-card-${index}`} className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-[var(--rust)]">Ver alcance <ChevronRight size={14} /></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--ink)] py-24 text-[var(--paper)] md:py-32">
          <div className="page-wrap grid gap-12 md:grid-cols-[.7fr_1.3fr]">
            <SectionHeading kicker="Una obra reciente" title="De pasillo oscuro a casa que respira." body="Una cocina abierta para una familia que necesitaba volver a encontrarse alrededor de la mesa." light />
            <div className="grid gap-5 sm:grid-cols-[1.4fr_.8fr]">
              <div className="image-sheen aspect-[1.3] overflow-hidden">
                {/* REEMPLAZAR: proyecto de portada por un antes/después real. */}
                <img data-testid="img-home-project" src="/images/before-after-living.jpg" alt="Antes y después de una sala remodelada" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-end border-l border-[rgba(246,241,232,.2)] pl-6">
                <p className="eyebrow text-[var(--gold)]">Proyecto 08 · Ñuñoa</p>
                <p className="mt-5 text-sm leading-7 text-[rgba(246,241,232,.7)]">Abrimos la cocina, recuperamos la luz y elegimos materiales que pueden vivir con niños y con tiempo.</p>
                <Link href="/galeria" data-testid="link-home-project" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold)]">Ver historia completa <ArrowUpRight size={16} /></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="page-wrap py-24 md:py-32">
          <div className="grid gap-14 md:grid-cols-[1fr_.9fr]">
            <div>
              <SectionHeading kicker="Así trabajamos" title="Claro antes, durante y después." />
              <div className="mt-12 border-t border-[rgba(47,41,35,.18)]">
                {[
                  ['01', 'Nos cuentas', 'Una llamada, una foto o un audio. Partimos entendiendo cómo vives hoy.'],
                  ['02', 'Visitamos', 'Vemos el espacio, medimos lo importante y aterrizamos las posibilidades reales.'],
                  ['03', 'Presupuestamos', 'Recibes un alcance ordenado, con materiales, tiempos y decisiones a la vista.'],
                  ['04', 'Construimos', 'Coordinamos la obra y te mantenemos al tanto hasta entregar limpio.'],
                ].map(([n, title, body]) => (
                  <div key={n} className="grid grid-cols-[42px_1fr] gap-5 border-b border-[rgba(47,41,35,.18)] py-6">
                    <span className="project-number pt-1 text-[var(--rust)]">{n}</span>
                    <div><h3 className="text-base font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--steel)]">{body}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="image-sheen self-end bg-[var(--gold)] p-3 md:rotate-2">
              {/* REEMPLAZAR: detalle de manos/materiales de una obra real. */}
              <img data-testid="img-home-detail" src="/images/detail-workshop.jpg" alt="Detalle de trabajo en madera durante una remodelación" className="aspect-[.9] w-full object-cover grayscale-[.1]" />
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(47,41,35,.15)] bg-[#e8dfd0] py-20">
          <div className="page-wrap grid gap-9 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div className="flex items-center gap-4 text-[var(--rust)]"><Quote size={34} strokeWidth={1.3} /><span className="eyebrow">Lo dicen quienes abrieron la puerta</span></div>
            <blockquote className="display-font max-w-3xl text-3xl leading-tight font-semibold md:text-5xl">“Lo mejor fue que nunca tuvimos que perseguir a nadie. La casa quedó linda, pero también mucho más nuestra.”<footer className="mono-font mt-6 text-xs font-normal tracking-normal text-[var(--steel)]">— Marcela y Rodrigo · Providencia</footer></blockquote>
          </div>
        </section>
        <ContactBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </PageShell>
  );
}

function ContactBand() {
  return (
    <section className="page-wrap py-24 md:py-32">
      <div className="relative overflow-hidden bg-[var(--rust)] px-7 py-12 text-[var(--paper)] md:px-16 md:py-16">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[28px] border-[rgba(246,241,232,.12)]" />
        <div className="relative max-w-2xl">
          <p className="eyebrow text-[var(--gold)]">El primer paso es sencillo</p>
          <h2 className="display-font mt-4 text-4xl leading-none font-semibold md:text-6xl">Cuéntame qué quieres cambiar.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-[rgba(246,241,232,.76)]">Mándame un mensaje con una foto, tu comuna y una idea aproximada. Te respondo personalmente.</p>
          <WhatsAppAction label="Escribir por WhatsApp" className="mt-8 bg-[var(--gold)] text-[var(--ink)] hover:bg-[var(--paper)]" />
        </div>
      </div>
    </section>
  );
}

function PageIntro({ kicker, title, body }: { kicker: string; title: ReactNode; body: string }) {
  return <section className="hero-grid border-b border-[rgba(47,41,35,.14)]"><div className="page-wrap py-20 md:py-28"><p className="eyebrow text-[var(--rust)]">{kicker}</p><h1 className="display-font mt-5 max-w-4xl text-6xl leading-[.92] font-semibold tracking-[-.05em] md:text-8xl">{title}</h1><p className="mt-8 max-w-xl text-lg leading-8 text-[var(--steel)]">{body}</p></div></section>;
}

const serviceItems = [
  { n: '01', title: 'Cocinas', image: '/images/hero-kitchen.jpg', text: 'Diseñamos una cocina que calce con tu manera de habitar: distribución, muebles, cubiertas, revestimientos, iluminación y coordinación de especialidades.', list: ['Muebles a medida y recuperación', 'Cubiertas, lavaplatos y grifería', 'Cerámicas, pintura e iluminación'] },
  { n: '02', title: 'Baños', image: '/images/bathroom-renovation.jpg', text: 'Del picar al último sello. Resolvemos humedad, instalaciones y terminaciones para que un baño bonito también sea un baño tranquilo.', list: ['Impermeabilización y reparación', 'Cerámicas y porcelanatos', 'Muebles, espejos y accesorios'] },
  { n: '03', title: 'Espacios a medida', image: '/images/detail-workshop.jpg', text: 'Soluciones que no vienen en caja: closets, repisas, quinchos, ampliaciones pequeñas y carpintería integrada al espacio.', list: ['Diseño y fabricación en madera', 'Repisas, puertas y closets', 'Quinchos y mejoras exteriores'] },
  { n: '04', title: 'Terminaciones', image: '/images/before-after-living.jpg', text: 'Cuando la casa necesita una puesta a punto completa, coordinamos lo necesario para devolverle luz, orden y carácter.', list: ['Pisos, pintura y puertas', 'Reparaciones y mantención', 'Coordinación de oficios'] },
];

function Services() {
  return <PageShell><Header /><main><PageIntro kicker="Servicios" title={<>Que se note el cuidado.<br /><em className="text-[var(--rust)]">Que dure</em> el trabajo.</>} body="Desde una cocina completa hasta esa reparación que cambia cómo se siente un espacio. Elegimos la solución correcta, no la más grande." /><section className="page-wrap py-20 md:py-28"><div className="grid gap-14">{serviceItems.map((item, i) => <article key={item.title} className={`grid gap-8 border-b border-[rgba(47,41,35,.16)] pb-14 md:grid-cols-[.85fr_1.15fr] md:gap-16 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}><div className="image-sheen aspect-[1.25] overflow-hidden bg-[var(--wood)]"><img data-testid={`img-service-${i}`} src={item.image} alt={`${item.title} en una remodelación`} className="h-full w-full object-cover transition duration-700 hover:scale-105" /></div><div className="flex flex-col justify-center"><div className="flex items-center justify-between"><span className="eyebrow text-[var(--rust)]">Servicio / {item.n}</span><Wrench size={20} className="text-[var(--gold)]" /></div><h2 className="display-font mt-5 text-4xl font-semibold md:text-5xl">{item.title}</h2><p className="mt-5 max-w-lg leading-7 text-[var(--steel)]">{item.text}</p><ul className="mt-7 grid gap-3 text-sm">{item.list.map((point) => <li key={point} className="flex items-center gap-3"><Check size={16} className="text-[var(--rust)]" /> {point}</li>)}</ul><a data-testid={`link-service-whatsapp-${i}`} href={whatsappLink(`Hola, me interesa el servicio de ${item.title}.`)} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 border-b border-[var(--rust)] pb-1 text-sm font-bold text-[var(--rust)]">Conversar sobre {item.title} <ArrowUpRight size={15} /></a></div></article>)}</div></section><ContactBand /></main><Footer /><FloatingWhatsApp /></PageShell>;
}

const projects = [
  { title: 'Cocina abierta para una familia', place: 'Ñuñoa · 2024', image: '/images/before-after-living.jpg', tag: 'Cocina completa', copy: 'Más luz, mejor circulación y una mesa donde antes solo había un muro.' },
  { title: 'Baño principal, sin humedad', place: 'La Reina · 2024', image: '/images/bathroom-renovation.jpg', tag: 'Baño y terminaciones', copy: 'Materiales nobles y una solución definitiva para un problema que llevaba años.' },
  { title: 'Madera que ordena', place: 'Providencia · 2023', image: '/images/detail-workshop.jpg', tag: 'Carpintería a medida', copy: 'Un frente de guardado que hizo desaparecer el ruido visual del living.' },
  { title: 'Cocina con una segunda vida', place: 'Macul · 2023', image: '/images/hero-kitchen.jpg', tag: 'Recuperación', copy: 'Conservamos lo que tenía historia y cambiamos lo que ya no ayudaba.' },
];

function Gallery() {
  return <PageShell><Header /><main><PageIntro kicker="Galería / Antes · Después" title={<>Los cambios<br /><em className="text-[var(--rust)]">se sienten.</em></>} body="Cada proyecto empieza con algo que no funciona. El resultado no busca parecer nuevo: busca sentirse correcto para quienes viven ahí." /><section className="page-wrap py-20 md:py-28"><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><p className="max-w-md text-sm leading-6 text-[var(--steel)]">Una selección de obras. Las imágenes son referencias visuales mientras terminamos de fotografiar proyectos reales.</p><span className="mono-font text-xs text-[var(--steel)]">04 historias / Santiago</span></div><div className="grid gap-14">{projects.map((project, i) => <article key={project.title} className="grid gap-7 md:grid-cols-[1.15fr_.85fr] md:items-center"><div className={`image-sheen overflow-hidden bg-[var(--wood)] ${i % 2 ? 'md:order-2' : ''}`}><img data-testid={`img-project-${i}`} src={project.image} alt={project.title} className="aspect-[1.35] w-full object-cover transition duration-700 hover:scale-105" /></div><div className={`${i % 2 ? 'md:order-1' : ''}`}><span className="project-number">0{i + 1} / {project.place}</span><p className="eyebrow mt-5 text-[var(--rust)]">{project.tag}</p><h2 className="display-font mt-3 text-4xl leading-tight font-semibold">{project.title}</h2><p className="mt-4 text-sm leading-7 text-[var(--steel)]">{project.copy}</p><a data-testid={`link-project-${i}`} href={whatsappLink(`Hola, vi el proyecto "${project.title}" y quisiera conversar sobre algo parecido.`)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--rust)]">Quiero algo parecido <ArrowUpRight size={15} /></a></div></article>)}</div></section><section className="bg-[#e8dfd0] py-20"><div className="page-wrap flex flex-col justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow text-[var(--rust)]">Tu casa no tiene que esperar</p><h2 className="display-font mt-3 text-4xl font-semibold">¿Tienes un antes?</h2></div><WhatsAppAction label="Mostrar mi proyecto" /></div></section></main><Footer /><FloatingWhatsApp /></PageShell>;
}

function Nosotros() {
  return <PageShell><Header /><main><PageIntro kicker="Nosotros" title={<>Oficio para<br /><em className="text-[var(--rust)]">vivir mejor.</em></>} body="Oficio Norte nació de una idea simple: una buena remodelación no debería sentirse como una pelea. Debería devolverte tiempo, confianza y ganas de habitar." /><section className="page-wrap grid gap-12 py-20 md:grid-cols-[1fr_1fr] md:py-28"><div className="image-sheen aspect-[.9] overflow-hidden bg-[var(--wood)] md:rotate-[-2deg]"><img data-testid="img-about-story" src="/images/detail-workshop.jpg" alt="Maestro constructor trabajando en una pieza de madera" className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center md:pl-10"><p className="eyebrow text-[var(--rust)]">La historia</p><h2 className="display-font mt-4 text-4xl font-semibold md:text-5xl">Una persona responsable, no una caja negra.</h2><div className="mt-6 space-y-4 text-[var(--steel)] leading-7"><p>Después de años recorriendo obras y aprendiendo cada parte del oficio, decidí trabajar de una forma más directa: menos promesas, más conversación y un resultado que se pueda recomendar con tranquilidad.</p><p>Yo coordino, yo te explico, yo respondo. Y cuando hace falta un especialista, trabajo con una red pequeña de personas de confianza.</p></div><div className="mt-8 border-l-2 border-[var(--gold)] pl-5"><p className="display-font text-xl font-semibold">“La casa de alguien merece el mismo cuidado que la propia.”</p><p className="mono-font mt-3 text-xs text-[var(--steel)]">— Principio de trabajo</p></div></div></section><section className="bg-[var(--ink)] py-20 text-[var(--paper)] md:py-28"><div className="page-wrap"><SectionHeading kicker="Lo que importa" title="La confianza también se construye." body="No hacemos la obra más grande. Hacemos la obra que tiene sentido." light /><div className="mt-14 grid gap-8 md:grid-cols-3">{[['01', 'Responsabilidad', 'Si algo cambia, lo sabes. Si hay una duda, la conversamos antes de avanzar.'], ['02', 'Detalle', 'Las terminaciones no son un extra. Son la diferencia entre resolver y hacer bien.'], ['03', 'Respeto', 'Trabajamos en tu casa, con tus tiempos, tus vecinos y tu forma de vivir presente.']].map(([n, title, body]) => <div key={n} className="border-t border-[rgba(246,241,232,.22)] pt-5"><span className="project-number text-[var(--gold)]">{n}</span><h3 className="display-font mt-8 text-3xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-7 text-[rgba(246,241,232,.64)]">{body}</p></div>)}</div></div></section><section className="page-wrap py-20 md:py-28"><div className="grid gap-12 md:grid-cols-[.65fr_1.35fr]"><SectionHeading kicker="Las personas" title="Pocas manos. Las correctas." body="Trabajamos con una red estable de especialistas para que el estándar no cambie cuando cambia el oficio." /><div className="grid gap-5 sm:grid-cols-2"><TeamCard name="Martín Pérez" role="Maestro y coordinador" initials="MP" color="var(--wood)" /><TeamCard name="Red de confianza" role="Gasfitería · electricidad · muebles" initials="OC" color="var(--steel)" /></div></div></section><ContactBand /></main><Footer /><FloatingWhatsApp /></PageShell>;
}

function TeamCard({ name, role, initials, color }: { name: string; role: string; initials: string; color: string }) {
  return <div className="lift border border-[rgba(47,41,35,.16)] bg-[var(--card)] p-5"><div className="grid aspect-square place-items-center text-[var(--paper)]" style={{ background: color }}><span className="display-font text-5xl">{initials}</span></div>{/* REEMPLAZAR: iniciales por fotografía real del equipo cuando esté disponible. */}<h3 className="mt-5 text-base font-bold">{name}</h3><p className="mt-1 text-xs leading-5 text-[var(--steel)]">{role}</p></div>;
}

const priceRows = [
  ['Puesta a punto', 'Desde $1.200.000', 'Pintura, reparaciones, pisos o puertas para renovar sin meterse en una obra mayor.'],
  ['Baño completo', 'Desde $2.800.000', 'Demolición, instalaciones, revestimientos, artefactos y terminaciones.'],
  ['Cocina completa', 'Desde $4.500.000', 'Diseño de distribución, muebles, cubierta, revestimientos e instalación.'],
  ['Espacio a medida', 'A conversar', 'Closets, quinchos, ampliaciones pequeñas y soluciones especiales.'],
];

function Prices() {
  return <PageShell><Header /><main><PageIntro kicker="Precios de referencia" title={<>Invertir en tu casa,<br /><em className="text-[var(--rust)]">sin adivinar.</em></>} body="Cada casa tiene su historia y cada presupuesto se arma a medida. Estos rangos ayudan a tener una primera conversación honesta." /><section className="page-wrap py-20 md:py-28"><div className="grid gap-14 md:grid-cols-[.75fr_1.25fr]"><div><SectionHeading kicker="Rangos orientativos" title="Una brújula para partir." body="Valores de referencia para obras en Santiago. Se ajustan después de visitar, medir y definir materiales." /><div className="mt-8 flex items-start gap-3 border-l-2 border-[var(--gold)] pl-4 text-sm leading-6 text-[var(--steel)]"><Clock3 size={18} className="mt-1 shrink-0 text-[var(--rust)]" />El valor final depende del estado actual, superficie y nivel de terminación.</div></div><div className="border-t border-[rgba(47,41,35,.18)]">{priceRows.map(([title, price, body], i) => <div key={title} className="grid gap-3 border-b border-[rgba(47,41,35,.18)] py-7 sm:grid-cols-[1fr_auto] sm:gap-8"><div><span className="project-number text-[var(--rust)]">0{i + 1}</span><h2 className="display-font mt-3 text-2xl font-semibold">{title}</h2><p className="mt-2 max-w-lg text-sm leading-6 text-[var(--steel)]">{body}</p></div><strong className="self-start text-sm text-[var(--rust)] sm:pt-5">{price}</strong></div>)}</div></div></section><section className="bg-[#e8dfd0] py-20"><div className="page-wrap grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center"><div className="flex items-center gap-4"><ShieldCheck size={42} strokeWidth={1.2} className="text-[var(--rust)]" /><p className="display-font text-3xl font-semibold">Presupuesto claro, decisión tranquila.</p></div><div><p className="text-sm leading-7 text-[var(--steel)]">La primera conversación no tiene costo. Cuéntame qué quieres hacer y te digo si puedo ayudarte, cuánto podría tomar y cuál sería el siguiente paso.</p><WhatsAppAction label="Pedir una orientación" className="mt-6" /></div></div></section></main><Footer /><FloatingWhatsApp /></PageShell>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const detail = String(form.get('detail') || '');
    window.open(whatsappLink(`Hola, soy ${name}. Me gustaría conversar sobre una remodelación. ${detail}`), '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  return <PageShell><Header /><main><PageIntro kicker="Contacto" title={<>Hablemos de<br /><em className="text-[var(--rust)]">tu casa.</em></>} body="Una foto, una comuna y una idea son suficientes para empezar. Te respondo yo, normalmente dentro del día." /><section className="page-wrap grid gap-14 py-20 md:grid-cols-[.8fr_1.2fr] md:py-28"><div><SectionHeading kicker="Canales directos" title="Sin formularios perdidos." body="Elige la forma que te resulte más cómoda. Para cotizar, WhatsApp es el camino más rápido." /><div className="mt-10 grid gap-5"><a data-testid="link-contact-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" className="lift flex items-center justify-between border border-[rgba(47,41,35,.18)] bg-[var(--card)] p-5"><span className="flex items-center gap-4"><MessageCircle className="text-[var(--rust)]" /><span><strong className="block">WhatsApp</strong><span className="mt-1 block text-sm text-[var(--steel)]">{DISPLAY_PHONE}</span></span></span><ArrowUpRight size={18} /></a><a data-testid="link-contact-phone" href={`tel:${DISPLAY_PHONE.replaceAll(' ', '')}`} className="lift flex items-center justify-between border border-[rgba(47,41,35,.18)] bg-[var(--card)] p-5"><span className="flex items-center gap-4"><Phone className="text-[var(--rust)]" /><span><strong className="block">Llamar</strong><span className="mt-1 block text-sm text-[var(--steel)]">Lunes a viernes · 9:00 a 18:00</span></span></span><ArrowUpRight size={18} /></a><div data-testid="text-contact-location" className="flex items-center gap-4 border border-[rgba(47,41,35,.18)] p-5"><MapPin className="text-[var(--rust)]" /><span><strong className="block">Dónde trabajamos</strong><span className="mt-1 block text-sm text-[var(--steel)]">{LOCATION_COPY}</span></span></div></div></div><div className="bg-[var(--ink)] p-7 text-[var(--paper)] md:p-10"><p className="eyebrow text-[var(--gold)]">Cuéntame lo esencial</p><h2 className="display-font mt-4 text-4xl font-semibold">Te leo.</h2><form onSubmit={handleSubmit} className="mt-8 grid gap-5"><label className="grid gap-2 text-sm">Tu nombre<input data-testid="input-contact-name" required name="name" className="border-b border-[rgba(246,241,232,.3)] bg-transparent px-0 py-3 outline-none placeholder:text-[rgba(246,241,232,.42)] focus:border-[var(--gold)]" placeholder="Cómo te llamas" /></label><label className="grid gap-2 text-sm">¿Qué quieres cambiar?<textarea data-testid="input-contact-detail" required name="detail" rows={4} className="resize-none border-b border-[rgba(246,241,232,.3)] bg-transparent px-0 py-3 outline-none placeholder:text-[rgba(246,241,232,.42)] focus:border-[var(--gold)]" placeholder="Cocina, baño, pintura, una idea..." /></label><button data-testid="button-contact-submit" type="submit" className="mt-3 inline-flex items-center justify-center gap-2 bg-[var(--gold)] px-5 py-3 text-sm font-bold text-[var(--ink)] transition hover:bg-[var(--paper)]"><Send size={16} /> Abrir WhatsApp</button>{sent && <p data-testid="status-contact-sent" className="flex items-center gap-2 text-xs text-[var(--gold)]"><Check size={15} /> Se abrió WhatsApp con tu mensaje listo.</p>}</form></div></section></main><Footer /><FloatingWhatsApp /></PageShell>;
}

function FloatingWhatsApp() {
  return <a data-testid="link-floating-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp" className="whatsapp-float fixed bottom-5 right-5 z-20 grid h-14 w-14 place-items-center rounded-full bg-[var(--rust)] text-[var(--paper)] transition hover:scale-105 hover:bg-[var(--wood)]"><MessageCircle size={23} /></a>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route path="/servicios" component={Services} /><Route path="/galeria" component={Gallery} /><Route path="/nosotros" component={Nosotros} /><Route path="/precios" component={Prices} /><Route path="/contacto" component={Contact} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;