"use client";
// Three-step transfer: recipient → amount → confirm. The API validates and returns a
// demo receipt; nothing is stored and no gold moves.
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Reveal, Tween } from "@/components/Motion";
import { usePrices } from "@/components/PriceProvider";
import { CONTACTS, VAULT, vaultGrams } from "@/lib/data";
import { grams as g, usd } from "@/lib/format";
import { useLang, useT } from "@/components/Lang";

type Receipt = { reference: string; grams: number; valueToday: number; remaining: number; to: { name: string; nameAr?: string; id: string } };

// Arabic grams ("10.000 غ"): globals.css forces span.num to ltr, which would put the unit on the wrong side.
const RTL = { direction: "rtl" } as const;
const DIR_AR: Record<string, string> = { Sent: "مُرسَل", Received: "مُستلَم" };
const STATUS_AR: Record<string, string> = { Completed: "مكتمل", Cancelled: "ملغى" };

export function TransferFlow() {
  const { quote } = usePrices();
  const t = useT();
  const lang = useLang();
  const ar = lang === "ar";
  const dx = ar ? -30 : 30;
  const available = vaultGrams();
  const [step, setStep] = useState(1);
  const [to, setTo] = useState(CONTACTS[0].id);
  const [amount, setAmount] = useState("10.000");
  const [message, setMessage] = useState(ar ? "كل عام وأنتِ بخير يا سارة، هديةٌ لمستقبلكِ." : "Happy birthday, Sara — for your future.");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const grams = Number(amount) || 0;
  const contact = CONTACTS.find((c) => c.id === to)!;
  const over = grams > available;

  const send = async () => {
    setBusy(true); setError("");
    const res = await fetch("/api/transfer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ to, grams, message }) }).catch(() => null);
    const data = res ? await res.json() : { error: t("Could not reach the server. Try again.", "تعذّر الاتصال بالخادم. حاول مرة أخرى.") };
    setBusy(false);
    if (!res?.ok) { setError(data.error); setStep(2); return; }
    setReceipt(data); setStep(4);
  };
  const reset = () => { setReceipt(null); setStep(1); };

  return (
    <>
      <div className="split" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: 24, marginTop: 30, alignItems: "flex-start" }}>
        <Reveal className="panel" style={{ padding: "34px 36px", minHeight: 640 }}>
          <div className="stepper">
            {(ar ? ["المستلم", "الكمية", "التأكيد"] : ["Recipient", "Amount", "Confirm"]).map((l, i) => <div key={l} className={step === i + 1 ? "on" : step > i + 1 ? "done" : ""}><b>{step > i + 1 ? "✓" : i + 1}</b>{l}</div>)}
          </div>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: dx }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -dx }} transition={{ duration: 0.35 }}>
                <div className="field" style={{ marginTop: 28 }}><label>{t("Send to", "إرسال إلى")}</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }} role="radiogroup">
                    {CONTACTS.map((c) => (
                      <button key={c.id} role="radio" aria-checked={to === c.id} className={`contact${to === c.id ? " on" : ""}`} onClick={() => setTo(c.id)}>
                        <span className="av">{(ar ? c.nameAr : c.name)[0]}</span><div style={{ flex: 1 }}><div style={{ fontWeight: 600 }}>{ar ? c.nameAr : c.name}</div><div className="muted" style={{ fontSize: 12 }}>{ar ? <>رقم ميلودي <span className="num">{c.id}</span> · جوال ينتهي بـ <span className="num">{c.phone}</span></> : <>Melody ID {c.id} · mobile ending {c.phone}</>}</div></div><span className="chip chip-green">{t("Verified", "موثَّق")}</span>
                      </button>
                    ))}
                    <div className="contact" style={{ cursor: "default", opacity: 0.6 }} title={t("Not built in this version", "غير متاح في هذه النسخة")}><span className="av">+</span><span style={{ fontSize: 14 }}>{t("New client by Melody ID or mobile number", "عميل جديد برقم ميلودي أو رقم الجوال")}</span></div>
                  </div>
                </div>
                <button className="btn btn-dark" style={{ width: "100%", height: 58, marginTop: 28 }} onClick={() => setStep(2)}>{t("Continue", "متابعة")}</button>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: dx }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -dx }} transition={{ duration: 0.35 }}>
                <div className="field" style={{ marginTop: 28 }}><label htmlFor="tg">{t("Amount of gold", "كمية الذهب")}</label>
                  <div className="input" style={{ height: 92, borderColor: over ? "#9B1C1C" : undefined }}><input id="tg" className="input-el num serif" style={{ fontSize: 52 }} inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /><span className="muted" style={{ fontSize: 18 }}>{t("grams", "غرام")}</span><span className="num muted hide-sm" style={{ marginInlineStart: "auto", whiteSpace: "nowrap" }}>≈ {usd(grams * quote.mid)}</span></div>
                  <span className="helper">{ar ? <>المتاح <span className="num" style={RTL}>{g(available, lang)}</span> · الحد الأدنى 0.001 غ</> : <>{g(available)} available · minimum 0.001 g</>}</span>
                  {(over || error) && <div className="field-error" role="alert">{over ? t(`You have ${g(available)} available. Enter a smaller amount.`, `رصيدك المتاح ${g(available, lang)}. أدخل كمية أقل.`) : error}</div>}
                </div>
                <div className="pills" style={{ marginTop: 14 }}>{[1, 5, 10, 25].map((n) => <button key={n} className={`pill${grams === n ? " on" : ""}`} onClick={() => setAmount(n.toFixed(3))}>{n} {t("g", "غ")}</button>)}<button className={`pill${grams === available ? " on" : ""}`} onClick={() => setAmount(available.toFixed(3))}>{t("All", "الكل")}</button></div>
                <div className="field" style={{ marginTop: 26 }}><label htmlFor="msg">{t("Message (optional)", "رسالة (اختيارية)")}</label><div className="input" style={{ height: 64 }}><input id="msg" className="input-el" maxLength={140} value={message} onChange={(e) => setMessage(e.target.value)} /></div></div>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <button className="btn btn-line" style={{ height: 58 }} onClick={() => setStep(1)}>{t("Back", "رجوع")}</button>
                  <button className="btn btn-dark" style={{ flex: 1, height: 58 }} disabled={over || grams < 0.001} onClick={() => { setError(""); setStep(3); }}>{t("Review transfer", "مراجعة التحويل")}</button>
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: dx }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -dx }} transition={{ duration: 0.35 }}>
                <p style={{ marginTop: 28, fontSize: 17 }}>{ar ? <>سترسل <b className="num">{g(grams, lang)}</b> من الذهب إلى <b>{contact.nameAr}</b> (<span className="num">{contact.id}</span>).</> : <>You are sending <b className="num">{g(grams)}</b> of gold to <b>{contact.name}</b> ({contact.id}).</>}</p>
                {message && <p className="muted" style={{ marginTop: 10 }}>{ar ? <>«{message}»</> : <>&ldquo;{message}&rdquo;</>}</p>}
                <div className="input" style={{ marginTop: 26, height: 70, justifyContent: "center", gap: 14, letterSpacing: "0.6em", fontSize: 24 }} aria-label={t("PIN entry (demo)", "إدخال الرمز السري (تجريبي)")} dir="ltr">••••••</div>
                <span className="helper" style={{ display: "block", marginTop: 8 }}>{t("Confirm with your 6-digit PIN or Face ID in the app. In this demo any confirmation works.", "أكّد العملية برمزك السري المكوّن من 6 أرقام أو ببصمة الوجه في التطبيق. في هذه النسخة التجريبية يُقبل أي تأكيد.")}</span>
                <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                  <button className="btn btn-line" style={{ height: 58 }} onClick={() => setStep(2)}>{t("Back", "رجوع")}</button>
                  <button className="btn btn-gold" style={{ flex: 1, height: 58 }} disabled={busy} onClick={send}>{busy ? t("Sending…", "جارٍ الإرسال…") : ar ? `إرسال ${g(grams, lang)}` : `Send ${g(grams)}`}</button>
                </div>
              </motion.div>
            )}
            {step === 4 && receipt && (
              <motion.div key="s4" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ textAlign: "center", paddingTop: 36 }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.15 }} style={{ width: 84, height: 84, borderRadius: 42, margin: "0 auto", background: "linear-gradient(120deg,#B47A34,#F4C17B,#E7AB58,#FADDBE)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--maroon-deep)" }}><Icon name="check" size={38} style={{ strokeWidth: 2 }} /></motion.div>
                <h2 style={{ fontSize: 44, marginTop: 24 }}>{ar ? <>أُرسل <span className="num" style={RTL}>{g(receipt.grams, lang)}</span> إلى <em>{receipt.to.nameAr ?? CONTACTS.find((c) => c.id === receipt.to.id)?.nameAr ?? receipt.to.name}</em></> : <><span className="num">{g(receipt.grams)}</span> sent to <em>{receipt.to.name}</em></>}</h2>
                <p className="muted" style={{ marginTop: 10 }}>{ar ? <>المرجع <span className="num">{receipt.reference}</span> · القيمة اليوم <span className="num">{usd(receipt.valueToday)}</span></> : <>Reference {receipt.reference} · value today {usd(receipt.valueToday)}</>}</p>
                <div className="demo-note" style={{ marginTop: 22, textAlign: "start" }}><Icon name="lock" size={15} />{t("Demo: the server checked this transfer, but nothing was saved and no gold moved. Your balance is unchanged.", "تجريبي: تحقّق الخادم من هذا التحويل، لكن لم يُحفظ شيء ولم يُنقل أي ذهب. رصيدك لم يتغيّر.")}</div>
                <button className="btn btn-line" style={{ marginTop: 26 }} onClick={reset}>{t("Make another transfer", "تحويل جديد")}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Reveal delay={0.1} className="panel-dark dark-rows" style={{ padding: 32 }}>
            <span className="eyebrow plain" style={{ color: "var(--on-dark-muted)" }}>{t("Summary", "الملخص")}</span>
            <div style={{ fontFamily: "var(--serif)", fontSize: 62, fontWeight: 600, lineHeight: 1.1, marginTop: 10 }}><Tween value={grams} format={(n) => g(n, lang)} className="gold-text shimmer num" style={ar ? RTL : undefined} /></div>
            <div style={{ fontSize: 13, color: "var(--on-dark-muted)" }}>{t("Gold 24K · 999.9", "ذهب عيار 24 · 999.9")}</div>
            <div style={{ marginTop: 20 }}>
              <div className="row"><span>{t("To", "إلى")}</span><span>{ar ? <>{contact.nameAr} · <span className="num">{contact.id}</span></> : <>{contact.name} · {contact.id}</>}</span></div>
              <div className="row"><span>{t("Value today", "القيمة اليوم")}</span><Tween value={grams * quote.mid} format={(n) => usd(n)} className="num" /></div>
              <div className="row"><span>{t("Transfer fee", "رسوم التحويل")}</span><span>{t("[Fee]", "[الرسوم]")}</span></div>
              <div className="row" style={{ borderBottom: 0 }}><span>{t("Left in your vault", "المتبقي في خزنتك")}</span><span className="num" style={ar ? RTL : undefined}>{g(Math.max(0, available - grams), lang)}</span></div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16, fontSize: 12, color: "var(--on-dark-muted)" }}><Icon name="lock" size={15} style={{ color: "var(--pale-gold)" }} />{t("Confirmed with your PIN or Face ID", "يُؤكَّد برمزك السري أو ببصمة الوجه")}</div>
          </Reveal>
          <Reveal delay={0.2} className="photo zoom" style={{ height: 300 }}>
            <div className="ph" style={{ position: "absolute", inset: 0 }}><img src="/img/man-phone.jpg" alt={t("A client sending gold from his phone", "عميل يرسل الذهب من هاتفه")} style={{ objectPosition: "50% 30%" }} /></div>
            <div className="shade" style={{ background: "linear-gradient(0deg, rgba(44,5,9,0.92) 0%, rgba(44,5,9,0.1) 70%)" }} />
            <div className="inner" style={{ position: "relative", padding: "190px 28px 0" }}><h3 style={{ fontSize: 26 }}>{t("Gift gold in seconds", "أهدِ الذهب في ثوانٍ")}</h3><p style={{ fontSize: 13, color: "var(--on-dark-muted)", marginTop: 4 }}>{t("Also in the Melody app.", "متاح أيضاً في تطبيق ميلودي.")}</p></div>
          </Reveal>
        </div>
      </div>

      <Reveal className="panel" style={{ padding: "30px 32px", marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 28 }}>{t("Transfer history", "سجل التحويلات")}</h3><span className="link">{t("Export", "تصدير")}</span></div>
        <div style={{ overflowX: "auto" }}>
          <table className="t" style={{ marginTop: 18 }}>
            <thead><tr><th>{t("Date", "التاريخ")}</th><th>{t("Client", "العميل")}</th><th>{t("Direction", "الاتجاه")}</th><th className="r">{t("Amount", "الكمية")}</th><th className="r">{t("Value then", "القيمة حينها")}</th><th className="r">{t("Status", "الحالة")}</th></tr></thead>
            <tbody>{VAULT.transfers.map((tr) => (
              <tr key={tr.date}><td>{ar ? tr.dateAr : tr.date}</td><td>{ar ? tr.clientAr : tr.client}</td><td>{ar ? DIR_AR[tr.dir] : tr.dir}</td><td className="r num">{g(tr.grams, lang)}</td><td className="r num">{usd(tr.value)}</td><td className="r"><span className={`chip ${tr.status === "Completed" ? "chip-green" : "chip-soft"}`}>{ar ? STATUS_AR[tr.status] : tr.status}</span></td></tr>
            ))}</tbody>
          </table>
        </div>
      </Reveal>
    </>
  );
}
