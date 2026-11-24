"use client";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { useLang, useT } from "@/components/Lang";
import type { Action, Bi } from "@/lib/factories";

type Props = { slug: string; factoryName: string; products: Bi[]; minInvest: number; replyHours: number; initial: Action | null };
type Errors = Record<string, string>;

/** Label, input, helper and error for one field. Kept outside the form so typed values survive re-renders. */
function Field({ id, label, hint, errors, children }: { id: string; label: string; hint?: string; errors: Errors; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !errors[id] && <span className="helper">{hint}</span>}
      {errors[id] && <span className="field-error" id={`${id}-err`} role="alert">{errors[id]}</span>}
    </div>
  );
}

export function RequestPanel({ slug, factoryName, products, minInvest, replyHours, initial }: Props) {
  const t = useT();
  const lang = useLang();
  const [action, setAction] = useState<Action | null>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ reference: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const CHOICES: [Action, string, string, string][] = [
    ["invest", "chart", t("Invest", "استثمر"), t("Put money into the factory's production and earn a return in gold or cash.", "ضع أموالك في إنتاج المصنع واحصل على عائد ذهباً أو نقداً.")],
    ["buy", "bag", t("Buy", "اشترِ"), t("Order bars or products straight from the factory.", "اطلب السبائك أو المنتجات مباشرة من المصنع.")],
    ["sell", "scale", t("Sell", "بِع"), t("Sell your gold, jewellery or scrap to the factory.", "بِع ذهبك أو مصوغاتك أو الكسر للمصنع.")],
  ];

  const choose = (a: Action) => {
    setAction(a); setErrors({}); setDone(null);
    const u = new URL(window.location.href); u.searchParams.set("action", a);
    window.history.replaceState(null, "", u);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!action) return;
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = Object.fromEntries(fd.entries());
    body.consent = fd.get("consent") === "on";
    body.factory = slug; body.action = action;
    setSending(true); setErrors({});
    const res = await fetch("/api/factory-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    setSending(false);
    if (!res || !data) { setErrors({ form: t("We couldn't reach the server. Check your connection and try again.", "تعذّر الوصول إلى الخادم. تحقّق من اتصالك وحاول مرة أخرى.") }); return; }
    if (!res.ok) {
      const errs: Errors = data.errors ?? { form: data.error };
      setErrors(errs);
      // Focus the first field with a problem, in the order it appears on screen
      const first = Array.from(formRef.current?.elements ?? []).find((el) => errs[(el as HTMLInputElement).name]) as HTMLElement | undefined;
      first?.focus();
      return;
    }
    setDone({ reference: data.reference });
  };

  const err = (k: string) => errors[k] ? <span className="field-error" id={`${k}-err`} role="alert">{errors[k]}</span> : null;
  const aria = (k: string) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="fx-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2 style={{ fontSize: 32 }}>{t("What would you like to do?", "ماذا تريد أن تفعل؟")}</h2>
        <span className="sample muted">{t("SAMPLE", "تجريبي")}</span>
      </div>
      <div className="fx-choices" role="radiogroup" aria-label={t("Request type", "نوع الطلب")}>
        {CHOICES.map(([k, icon, label, desc]) => (
          <button key={k} type="button" role="radio" aria-checked={action === k} className={`fx-choice${action === k ? " on" : ""}`} onClick={() => choose(k)}>
            <Icon name={icon} size={24} />
            <b>{label}</b>
            <span>{desc}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div key="done" className="fx-done card-surface" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <span className="fx-tick"><Icon name="check" size={26} /></span>
            <h3 style={{ fontSize: 28, marginTop: 18 }}>{t("Request ready", "الطلب جاهز")}</h3>
            <p style={{ marginTop: 10, color: "var(--on-dark-muted)" }}>{t(`Your ${action === "invest" ? "investment" : action === "buy" ? "purchase" : "sale"} request to ${factoryName} has the reference`, `طلب ${action === "invest" ? "الاستثمار" : action === "buy" ? "الشراء" : "البيع"} لدى ${factoryName} برقم مرجعي`)} <b className="num" style={{ color: "var(--pale-gold)", whiteSpace: "nowrap" }}>{done.reference}</b>. {t(`The factory usually replies within ${replyHours} hours.`, `يرد المصنع عادةً خلال ${replyHours} ساعة.`)}</p>
            <p className="fx-demo"><Icon name="bell" size={16} /> {t("Sample site: this request was checked but not sent. Factory requests will be delivered once the factories are connected.", "موقع تجريبي: تم التحقق من الطلب لكنه لم يُرسَل. ستصل الطلبات إلى المصانع بعد ربطها.")}</p>
            <button type="button" className="btn btn-line light" style={{ marginTop: 22 }} onClick={() => { setDone(null); formRef.current?.reset(); }}>{t("Send another request", "إرسال طلب آخر")}</button>
          </motion.div>
        ) : action ? (
          <motion.form key={action} ref={formRef} onSubmit={submit} noValidate className="fx-form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <fieldset>
              <legend>{action === "invest" ? t("Your investment", "استثمارك") : action === "buy" ? t("Your order", "طلبك") : t("What you are selling", "ما تريد بيعه")}</legend>
              {action === "invest" && (
                <div className="g2 fx-grid">
                  <Field errors={errors} id="amount" label={t("Amount (USD)", "المبلغ (دولار)")} hint={t(`From $${minInvest.toLocaleString("en-US")}`, `من ${minInvest.toLocaleString("en-US")} دولار`)}>
                    <div className="input"><span className="muted">$</span><input id="amount" name="amount" className="input-el num" inputMode="decimal" autoComplete="off" placeholder={String(minInvest)} {...aria("amount")} /></div>
                  </Field>
                  <Field errors={errors} id="term" label={t("Term", "المدة")}>
                    <div className="input"><select id="term" name="term" defaultValue="12" className="input-el" {...aria("term")}>{["6", "12", "24", "36"].map((m) => <option key={m} value={m}>{t(`${m} months`, `${m} شهراً`)}</option>)}</select></div>
                  </Field>
                  <Field errors={errors} id="returnAs" label={t("Take the return as", "استلام العائد")}>
                    <div className="input"><select id="returnAs" name="returnAs" defaultValue="gold" className="input-el">{[["gold", t("Gold, held in my Melody vault", "ذهب في خزنتي لدى ميلودي")], ["cash", t("Cash", "نقداً")]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
                  </Field>
                </div>
              )}
              {action === "buy" && (
                <div className="g2 fx-grid">
                  <Field errors={errors} id="product" label={t("Product", "المنتج")}>
                    <div className="input"><select id="product" name="product" className="input-el" {...aria("product")}>{products.map((p) => <option key={p.en} value={p.en}>{p[lang]}</option>)}</select></div>
                  </Field>
                  <Field errors={errors} id="quantity" label={t("Quantity", "الكمية")}>
                    <div className="input"><input id="quantity" name="quantity" className="input-el num" inputMode="numeric" defaultValue="1" {...aria("quantity")} /></div>
                  </Field>
                  <Field errors={errors} id="delivery" label={t("Delivery", "الاستلام")}>
                    <div className="input"><select id="delivery" name="delivery" defaultValue="vault" className="input-el">{[["vault", t("Keep it in my Melody vault", "حفظها في خزنتي لدى ميلودي")], ["pickup", t("Collect from the factory", "الاستلام من المصنع")], ["delivery", t("Insured delivery", "توصيل مؤمَّن")]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
                  </Field>
                </div>
              )}
              {action === "sell" && (
                <div className="g2 fx-grid">
                  <Field errors={errors} id="itemType" label={t("What is it?", "ما نوعه؟")}>
                    <div className="input"><select id="itemType" name="itemType" defaultValue="bars" className="input-el">{[["bars", t("Gold bars", "سبائك ذهب")], ["jewellery", t("Jewellery", "مصوغات")], ["scrap", t("Scrap gold", "كسر ذهب")], ["coins", t("Coins", "مسكوكات")]].map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></div>
                  </Field>
                  <Field errors={errors} id="weight" label={t("Weight (grams)", "الوزن (غرام)")}>
                    <div className="input"><input id="weight" name="weight" className="input-el num" inputMode="decimal" placeholder="25.5" {...aria("weight")} /><span className="muted">{t("g", "غ")}</span></div>
                  </Field>
                  <Field errors={errors} id="karat" label={t("Karat", "العيار")}>
                    <div className="input"><select id="karat" name="karat" defaultValue="24" className="input-el" {...aria("karat")}>{["24", "22", "21", "18"].map((k) => <option key={k} value={k}>{t(`${k}K`, `عيار ${k}`)}</option>)}</select></div>
                  </Field>
                  <Field errors={errors} id="visitDate" label={t("Preferred visit date (optional)", "موعد الزيارة المفضّل (اختياري)")} hint={t("The factory weighs and tests the gold before paying.", "يزن المصنع الذهب ويفحصه قبل الدفع.")}>
                    <div className="input"><input id="visitDate" name="visitDate" type="date" min={today} className="input-el" {...aria("visitDate")} /></div>
                  </Field>
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend>{t("Your details", "بياناتك")}</legend>
              <div className="g2 fx-grid">
                <Field errors={errors} id="fullName" label={t("Full name", "الاسم الكامل")}>
                  <div className="input"><input id="fullName" name="fullName" className="input-el" autoComplete="name" {...aria("fullName")} /></div>
                </Field>
                <Field errors={errors} id="phone" label={t("Phone", "الهاتف")}>
                  <div className="input"><input id="phone" name="phone" type="tel" dir="ltr" className="input-el num" autoComplete="tel" placeholder="+964 7XX XXX XXXX" {...aria("phone")} /></div>
                </Field>
                <Field errors={errors} id="email" label={t("Email (optional)", "البريد الإلكتروني (اختياري)")}>
                  <div className="input"><input id="email" name="email" type="email" dir="ltr" className="input-el" autoComplete="email" {...aria("email")} /></div>
                </Field>
                <Field errors={errors} id="notes" label={t("Notes (optional)", "ملاحظات (اختياري)")}>
                  <div className="input" style={{ height: "auto", padding: "12px 18px" }}><textarea id="notes" name="notes" rows={2} maxLength={500} className="input-el" style={{ resize: "vertical", font: "inherit" }} /></div>
                </Field>
              </div>
            </fieldset>

            <label className="fx-consent">
              <input type="checkbox" name="consent" {...aria("consent")} />
              <span>{t(`I agree that ${factoryName} and Melody may contact me about this request.`, `أوافق على أن يتواصل معي ${factoryName} وميلودي بخصوص هذا الطلب.`)}</span>
            </label>
            {err("consent")}
            {errors.form && <p className="field-error" role="alert">{errors.form}</p>}

            <button type="submit" className="btn btn-dark" disabled={sending} style={{ marginTop: 26, width: "100%" }}>
              {sending ? t("Sending…", "جارٍ الإرسال…") : t(`Send to ${factoryName}`, `إرسال إلى ${factoryName}`)}
            </button>
            <p className="helper" style={{ marginTop: 12, textAlign: "center" }}>{t("Sample site: requests are checked but not yet sent to factories.", "موقع تجريبي: تُراجَع الطلبات لكنها لا تُرسَل إلى المصانع بعد.")}</p>
          </motion.form>
        ) : (
          <motion.p key="pick" className="muted" style={{ marginTop: 24, fontSize: 15 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {t("Choose one of the options above to open its form.", "اختر أحد الخيارات أعلاه لفتح النموذج.")}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
