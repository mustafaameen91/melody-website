import Link from "next/link";
import { getT } from "@/lib/i18n-server";

export default async function NotFound() {
  const { lang, t } = await getT();
  return (
    <section style={{ padding: "160px 0", textAlign: "center" }}>
      <div className="wrap">
        <div className="eyebrow plain">{t("Page not found", "الصفحة غير موجودة")}</div>
        <h1 style={{ fontSize: 72, marginTop: 20 }}>{lang === "ar" ? <>هذه الصفحة <em>غير متوفرة</em></> : <>This page is <em>not here</em></>}</h1>
        <p className="lead" style={{ margin: "20px auto 0" }}>{t("The link may be old or mistyped.", "ربما يكون الرابط قديماً أو مكتوباً بشكل خاطئ.")}</p>
        <Link href="/" className="btn btn-dark" style={{ marginTop: 36 }}>{t("Back to home", "العودة إلى الرئيسية")}</Link>
      </div>
    </section>
  );
}
