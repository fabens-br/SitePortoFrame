import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, ChevronRight } from "lucide-react"
import { siteConfig } from "@/config/site"
import logoFooter from "@/public/images/logo-footer.png"
import styles from "./footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerMain}>
          
          <div className={styles.footerBrand}>
            <Image 
              src={logoFooter}
              alt="Porto Frame Logo" 
              unoptimized
              className={styles.logo}
            />
            <p className={styles.brandText}>
              Especialistas em tecnologia construtiva Wood Frame.
              Elevando o padrão de engenharia, sustentabilidade e sofisticação no Sul da Bahia.
            </p>
          </div>

          <div className={styles.footerNav}>
            <h4 className={styles.navTitle}>Navegação</h4>
            <nav className={styles.navLinks}>
              <Link href="/sobre" className={styles.navLink}>
                <ChevronRight className={styles.navLinkIcon} /> 
                Sobre a Empresa
              </Link>
              <Link href="/wood-frame" className={styles.navLink}>
                <ChevronRight className={styles.navLinkIcon} /> 
                O que é Wood Frame
              </Link>
              <Link href="/vantagens" className={styles.navLink}>
                <ChevronRight className={styles.navLinkIcon} /> 
                Vantagens
              </Link>
              <Link href="/projetos" className={styles.navLink}>
                <ChevronRight className={styles.navLinkIcon} /> 
                Projetos
              </Link>
            </nav>
          </div>

          <div className={styles.footerContact}>
            <h4 className={styles.contactTitle}>Fale com um Especialista</h4>
            <div className={styles.contactCard}>
              
              <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className={styles.contactItem}>
                <div className={`${styles.contactIconWrapper} ${styles.contactIconWrapperPrimary}`}>
                  <Phone size={18} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Telefone / WhatsApp</span>
                  <span className={styles.contactValue}>{siteConfig.contact.phoneDisplay}</span>
                </div>
              </a>

              <a href={`mailto:${siteConfig.contact.email}`} className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <Mail size={18} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>E-mail</span>
                  <span className={styles.contactValue}>{siteConfig.contact.email}</span>
                </div>
              </a>

              <a href="https://maps.app.goo.gl/xScZbfmazqChjwRb6" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                <div className={styles.contactIconWrapper}>
                  <MapPin size={18} />
                </div>
                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Sede</span>
                  <span className={styles.contactValue}>
                    Residencial Miramar Tênis Club<br />
                    Rua Guatemala, 21<br />
                    Porto Seguro / BA
                  </span>
                </div>
              </a>

            </div>
          </div>

        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Porto Frame. Todos os direitos reservados.</p>
          <div className={styles.bottomLinks}>
            <Link href="/politica-de-privacidade" className={styles.bottomLink}>Política de Privacidade</Link>
            <Link href="/termos-de-uso" className={styles.bottomLink}>Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
