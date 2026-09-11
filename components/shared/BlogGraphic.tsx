import { ClipboardList, MessageCircle, CalendarCheck, ArrowRight } from "lucide-react";
import styles from "../../app/blog/Blog.module.css";

export default function BlogGraphic({ slug }: { slug: string }) {
  const steps = slug.startsWith("how-")
    ? [ ["Find your fit", "Review physician profiles and clinic locations.", "/family-doctor/"], ["Request registration", "Confirm availability and wait for appointment details.", "/register/"], ["Prepare for your visit", "Bring questions, medication details, and relevant records.", "/services/new-patient-registration/"] ]
    : slug.startsWith("walk-")
      ? [ ["Ongoing care", "Contact your family doctor about routine reviews and follow-up.", "/services/family-medicine-edmonton/"], ["Non-emergency concerns", "Ask the clinic about walk-in availability before travelling.", "/walk-in/"], ["Unsure where to go?", "Health Link 811 provides health advice. For emergencies, call 911.", "https://www.primarycarealberta.ca/page14176.aspx"] ]
      : [ ["Bring your questions", "Note recent changes, family history, and medication concerns.", "/services/checkups-physicals/"], ["Discuss your priorities", "Ask which preventive services apply to your circumstances.", "/services/vaccinations-preventative-care/"], ["Agree on next steps", "Confirm results, follow-up, and when to return.", "/services/chronic-disease-management/"] ];
  const icons = [ClipboardList, MessageCircle, CalendarCheck];
  return <aside className={styles.graphic} aria-label="Your visit at a glance">
    <p className={styles.graphicEyebrow}>Your care, at a glance</p>
    <div className={styles.graphicSteps}>{steps.map(([title, text, href], i) => {
      const Icon = icons[i];
      return <div key={title}><span className={styles.graphicIcon}><Icon size={26} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p><a href={href}>Learn more <ArrowRight size={15} aria-hidden="true" /></a></div>;
    })}</div>
  </aside>;
}
