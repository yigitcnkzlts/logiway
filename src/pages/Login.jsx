import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", email);
      navigate("/home");
    }
  };

  return (
    <div className="page-wrapper">
      {/* SOL TARAF – LOGIWAY TANITIM */}
      <section className="info-panel">
        {/* Marka */}
        <div className="brand-box">
          <div className="logo-circle">LW</div>
          <div>
            <h2 className="brand-name">LOGIWAY</h2>
            <p className="brand-slogan">Modern Yük &amp; Araç Eşleşme Platformu</p>
          </div>
        </div>

        {/* Başlık + açıklama */}
        <h1 className="big-title">
          Türkiye ve Avrupa Lojistiğinde <br /> Yeni Bir Dönem
        </h1>

        <p className="big-subtitle">
          Türkiye’nin her şehrinde ve Avrupa genelinde faaliyet gösteren lojistik
          şirketleri için tasarlanmış, yük ve araç eşleşmesini hızlandıran modern
          taşımacılık platformu.
        </p>

        {/* Özellikler + istatistikler ortak grid */}
        <div className="info-grid">
          {/* Neden Logiway? */}
          <div className="features-card">
            <h3 className="why-title">Neden Logiway?</h3>
            <ul className="why-list">
              <li>
                <span className="why-icon">⚡</span>
                <div>
                  <h4>Hızlı Eşleşme</h4>
                  <p>Yük ve araçları saniyeler içinde bir araya getirir.</p>
                </div>
              </li>
              <li>
                <span className="why-icon">🔒</span>
                <div>
                  <h4>Güvenli İşlem</h4>
                  <p>Doğrulanmış kullanıcı profilleri ile güvenli süreç.</p>
                </div>
              </li>
              <li>
                <span className="why-icon">🌍</span>
                <div>
                  <h4>TR &amp; EU Uyumlu</h4>
                  <p>Türkiye içi ve Avrupa güzergahları için tek platform.</p>
                </div>
              </li>
              <li>
                <span className="why-icon">📊</span>
                <div>
                  <h4>Akıllı Altyapı</h4>
                  <p>Algoritma destekli önerilerle zaman kaybını azaltır.</p>
                </div>
              </li>
            </ul>
          </div>


          {/* İstatistik kutuları */}
          <div className="stats-box">
            <div className="stat-item">
              <h3>+1200</h3>
              <p>Aktif Kullanıcı</p>
              <span>Firmalar &amp; bireysel kullanıcılar</span>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Memnuniyet</p>
              <span>Gerçek kullanıcı geri bildirimlerine göre</span>
            </div>
            <div className="stat-item">
              <h3>12 sn</h3>
              <p>Ort. Eşleşme</p>
              <span>Yük &amp; araç eşleşme süresi hedefi</span>
            </div>
          </div>
        </div>

        <p className="info-footnote">
          Logiway, lojistik operasyonlarını hız, güven ve teknoloji ile yeniden
          şekillendirmek için geliştirildi. Tek panelden tüm süreci yönet.
        </p>

        <div className="europe-flags">🇹🇷 🇪🇺</div>
      </section>

      {/* SAĞ TARAF – ÜYELİK / GİRİŞ PANELİ */}
      <section className="auth-panel">
        <div className="auth-card neon-card">
          <h2 className="auth-title">Üyelik / Giriş</h2>
          <p className="auth-subtitle">
            Logiway’e giriş yaparak yük ve araç operasyonlarını tek ekrandan yönet.
          </p>

          {/* Sosyal giriş */}
          <div className="social-group">
            <button className="social-btn google ripple">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                className="icon-img"
                alt="Google"
              />
              Google ile devam et
            </button>

            <button className="social-btn facebook ripple">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                className="icon-img"
                alt="Facebook"
              />
              Facebook ile giriş yap
            </button>

            <button className="social-btn mail ripple">
              <img
                src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
                className="icon-img"
                alt="Mail"
              />
              Mail ile kayıt ol
            </button>
          </div>

          <div className="divider">
            <span>veya e-posta ile giriş yap</span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="form-area">
            <label className="field">
              <span className="field-label">Email</span>
              <input
                type="email"
                placeholder="ornek@firma.com"
                className="input glow-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="field">
              <span className="field-label">Şifre</span>
              <input
                type="password"
                placeholder="••••••••"
                className="input glow-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="submit-btn ripple">
              Giriş Yap
            </button>
          </form>

          <p className="bottom-text">
            Hesabın yok mu?
            <Link to="/register" className="bottom-link">
              Kayıt Ol
            </Link>
          </p>

          <p className="policy-text">
            Giriş yaparak Kullanım Şartları ve Gizlilik Politikası’nı kabul etmiş
            olursunuz.
          </p>
        </div>
      </section>
    </div>
  );
}