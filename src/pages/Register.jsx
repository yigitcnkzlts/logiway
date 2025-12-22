import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "",
    accepted: false,
  });

  const navigate = useNavigate();

  const update = (f, v) => setForm({ ...form, [f]: v });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.role) return alert("Lütfen profil tipi seçin.");
    if (form.password !== form.confirmPassword)
      return alert("Şifreler eşleşmiyor.");
    if (!form.accepted)
      return alert("Lütfen sözleşmeyi kabul edin.");

    localStorage.setItem("user", form.email);
    navigate("/home");
  };

  return (
    <div className="register-wrapper">

      {/* SOL PANEL */}
      <section className="register-info">
        <div className="brand-box">
          <div className="logo-circle">LW</div>
          <div>
            <h2 className="brand-name">LOGIWAY</h2>
            <p className="brand-slogan">Modern Taşımacılık Platformu</p>
          </div>
        </div>

        <h1 className="info-title">Yeni Hesabını Oluştur</h1>
        <p className="info-subtitle">
          Türkiye ve Avrupa lojistiğinde araç  yük eşleşmesini hızlandıran sisteme katıl.
        </p>
        <div className="info-flags">🇹🇷 🇪🇺</div>
      </section>

      {/* SAĞ PANEL */}
      <section className="register-panel">
        <div className="register-card">
          <h2 className="register-title">Kayıt Ol</h2>

          {/* Sosyal */}
          <div className="social-group">
            <button className="social-btn google ripple">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="icon-img"
              />
              Google ile kayıt ol
            </button>

            <button className="social-btn facebook ripple">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                className="icon-img"
              />
              Facebook ile kayıt ol
            </button>
          </div>

          <div className="divider"><span>veya</span></div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="form-area">

            {/* Email */}
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                className="input glow-input"
                placeholder="ornek@firma.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </label>

            {/* Şifre – Tekrar */}
            <div className="two-grid">
              <div className="field">
                <span>Şifre</span>
                <input
                  type="password"
                  className="input glow-input"
                  placeholder="••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <span>Tekrar</span>
                <input
                  type="password"
                  className="input glow-input"
                  placeholder="••••••"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Ad Soyad – Firma */}
            <div className="two-grid">
              <div className="field">
                <span>Ad Soyad</span>
                <input
                  type="text"
                  className="input glow-input"
                  placeholder="Ahmet Yılmaz"
                  value={form.fullname}
                  onChange={(e) => update("fullname", e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <span>Firma</span>
                <input
                  type="text"
                  className="input glow-input"
                  placeholder="Opsiyonel"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                />
              </div>
            </div>

            {/* Profil Tipi */}
            <div className="profile-buttons">
              <button
                type="button"
                onClick={() => update("role", "driver")}
                className={`profile-btn ${form.role === "driver" ? "active" : ""}`}
              >
                🚚 Araç Sahibi
              </button>

              <button
                type="button"
                onClick={() => update("role", "shipper")}
                className={`profile-btn ${form.role === "shipper" ? "active" : ""}`}
              >
                📦 Yük Veren
              </button>
            </div>

            {/* Sözleşme */}
            <label className="terms">
              <input
                type="checkbox"
                checked={form.accepted}
                onChange={(e) => update("accepted", e.target.checked)}
              />
              <span>Kullanım şartlarını kabul ediyorum.</span>
            </label>

            {/* Submit */}
            <button className="submit-btn ripple" type="submit">
              Hesap Oluştur
            </button>
          </form>

          <p className="bottom-text">
            Hesabın var mı?
            <Link to="/" className="bottom-link">Giriş Yap</Link>
          </p>
        </div>
      </section>
    </div>
  );
}