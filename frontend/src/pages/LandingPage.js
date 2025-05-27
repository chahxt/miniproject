// // src/pages/LandingPage.js
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./LandingPage.css";

// const faqs = [
//   {
//     q: "Is Secure SEO Insights free to use?",
//     a: "Yes! You can get started for free. Advanced features may require an upgrade."
//   },
//   {
//     q: "Do I need coding knowledge to use it?",
//     a: "No! Anyone can analyze their site and get instant SEO suggestions in a click."
//   },
//   {
//     q: "How secure is my website data?",
//     a: "Your data is encrypted and never shared. We value privacy and security."
//   },
//   {
//     q: "How do I contact support?",
//     a: "Email us anytime at secureseoinsightsteam@gmail.com."
//   }
// ];

// export default function LandingPage() {
//   const [typedText, setTypedText] = useState("");
//   const [showContent, setShowContent] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isLoggedIn = !!localStorage.getItem('user');
//   const navigate = useNavigate();

//   // Typing effect for main headline
//   const fullText = "Secure SEO Insights";
//   useEffect(() => {
//     let i = 0;
//     setTypedText("");
//     setShowContent(false);
//     function type() {
//       if (i <= fullText.length) {
//         setTypedText(fullText.slice(0, i));
//         i++;
//         setTimeout(type, 65);
//       } else {
//         setShowContent(true);
//       }
//     }
//     type();
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <div className="landing-root">
//       {/* Hamburger icon for sidebar */}
//       <button className="landing-hamburger" onClick={() => setSidebarOpen(true)}>
//         <span />
//         <span />
//         <span />
//       </button>
//       {/* Slide-out sidebar */}
//       <div className={`landing-sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
//         <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>&times;</button>
//         <div className="drawer-title">SEO NAV</div>
//         {!isLoggedIn && (
         
//           <Link to="/app/login" onClick={() => setSidebarOpen(false)}>Login</Link>

//         )}
//         {isLoggedIn && (
//           <>
//             <Link to="/app/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
//             <Link to="/app/users" onClick={() => setSidebarOpen(false)}>Users</Link>
//             <Link to="/app/settings" onClick={() => setSidebarOpen(false)}>Settings</Link>
//           </>
//         )}
//       </div>
//       <div className={`landing-blur-bg ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

//       {/* Animated Background Shapes */}
//       <div className="floating-bg-shape bubble-1"></div>
//       <div className="floating-bg-shape bubble-2"></div>
//       <div className="floating-bg-shape bubble-3"></div>
//       <div className="floating-bg-gradient"></div>

//       <div className="landing-main-content">
//         <h1 className="landing-title neon-glow typing">
//           {typedText}
//           <span className="typing-cursor">|</span>
//         </h1>
//         {showContent && (
//           <div className="landing-fadein">
//             <p className="landing-subtitle">
//               The all-in-one dashboard to supercharge your site’s visibility.<br />
//               AI-powered SEO audit, instant autofixes, and beautiful analytics.
//             </p>
//             <div className="landing-features">
//               <div className="feature-card fade-delay-1">
//                 <i className="fa fa-bolt"></i>
//                 <h3>Lightning SEO Scan</h3>
//                 <p>Audit your website in seconds, see real SEO health scores.</p>
//               </div>
//               <div className="feature-card fade-delay-2">
//                 <i className="fa fa-magic"></i>
//                 <h3>AI 1-Click Fixes</h3>
//                 <p>Get instant meta, alt text, and internal link suggestions.</p>
//               </div>
//               <div className="feature-card fade-delay-3">
//                 <i className="fa fa-users"></i>
//                 <h3>Team Workspace</h3>
//                 <p>Share your dashboard, collaborate, and track performance.</p>
//               </div>
//               <div className="feature-card fade-delay-4">
//                 <i className="fa fa-shield"></i>
//                 <h3>Data Privacy First</h3>
//                 <p>Everything is encrypted, and you control your own data.</p>
//               </div>
//             </div>

//   {/* Call to action stays at bottom */}
//             <div className="landing-cta">
//               <Link to="/app/login" className="cta-btn outline">Login</Link>
// <Link to="/app/register" className="cta-btn neon-btn">Get Started Free</Link>

//             </div>

            

//             {/* Cool Divider */}
//             <div className="neon-divider"><span>FAQ</span></div>

//             {/* FAQ Section */}
//             <div className="landing-faq">
//               {faqs.map((faq, idx) => (
//                 <details className="faq-item" key={idx}>
//                   <summary>{faq.q}</summary>
//                   <div>{faq.a}</div>
//                 </details>
//               ))}
//             </div>

//             {/* Another Divider */}
//             <div className="neon-divider contact-divider"><span>Contact Us</span></div>

//             {/* Contact info */}
//             <div className="landing-contact">
//               <h3>Contact Our Team</h3>
//               <p>
//                 Reach us any time at<br />
//                 <a href="mailto:secureseoinsightsteam@gmail.com">secureseoinsightsteam@gmail.com</a>
//               </p>
//               <p>
//                 <i className="fa fa-envelope"></i>  
//                 Or connect on Twitter: <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">@SEO_Insights</a>
//               </p>
//             </div>

          
//           </div>
//         )}
//       </div>
//     </div>
//   );

// }



import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const faqs = [
  {
    q: "Is Secure SEO Insights free to use?",
    a: "Yes! You can get started for free. Advanced features may require an upgrade."
  },
  {
    q: "Do I need coding knowledge to use it?",
    a: "No! Anyone can analyze their site and get instant SEO suggestions in a click."
  },
  {
    q: "How does the Semantic Gap Analyzer work?",
    a: "It compares your content to top-ranking pages and shows you missing topics/entities so you can fill the gaps and rank higher."
  },
  {
    q: "What is SERP Feature Assessment?",
    a: "It detects what Google features (like featured snippets, images, videos) appear for your target keyword and how you can win them."
  },
  {
    q: "Is there a security audit?",
    a: "Yes, our Security Health Check scans for SSL, security headers, cookies, and privacy policies to keep your site secure."
  },
  {
    q: "How secure is my website data?",
    a: "Your data is encrypted and never shared. We value privacy and security."
  },
  {
    q: "How do I contact support?",
    a: "Email us anytime at secureseoinsightsteam@gmail.com."
  }
];

export default function LandingPage() {
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('user');
  const navigate = useNavigate();

  // Typing effect for main headline
  const fullText = "Secure SEO Insights";
  useEffect(() => {
    let i = 0;
    setTypedText("");
    setShowContent(false);
    function type() {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
        setTimeout(type, 65);
      } else {
        setShowContent(true);
      }
    }
    type();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="landing-root">
      {/* Hamburger icon for sidebar */}
      <button className="landing-hamburger" onClick={() => setSidebarOpen(true)}>
        <span />
        <span />
        <span />
      </button>
      {/* Slide-out sidebar */}
      <div className={`landing-sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
        <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>&times;</button>
        <div className="drawer-title">SEO NAV</div>
        {!isLoggedIn && (
          <Link to="/app/login" onClick={() => setSidebarOpen(false)}>Login</Link>
        )}
        {isLoggedIn && (
          <>
            <Link to="/app/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
            <Link to="/app/users" onClick={() => setSidebarOpen(false)}>Users</Link>
            <Link to="/app/settings" onClick={() => setSidebarOpen(false)}>Settings</Link>
          </>
        )}
      </div>
      <div className={`landing-blur-bg ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* Animated Background Shapes */}
      <div className="floating-bg-shape bubble-1"></div>
      <div className="floating-bg-shape bubble-2"></div>
      <div className="floating-bg-shape bubble-3"></div>
      <div className="floating-bg-gradient"></div>

      <div className="landing-main-content">
        <h1 className="landing-title neon-glow typing">
          {typedText}
          <span className="typing-cursor">|</span>
        </h1>
        {showContent && (
          <div className="landing-fadein">
            <p className="landing-subtitle">
              All-in-one AI SEO & Security toolkit for modern websites.<br />
              Deep analysis, instant fixes, smart SERP insights, and real protection.
            </p>
          <div className="landing-features">
  <div className="feature-card fade-delay-1">
    <i className="fa fa-globe"></i>
    <h3>SEO URL Analyzer</h3>
    <p>Enter your website URL and get an instant SEO health score, dashboard, and tailored fixes.</p>
  </div>
  <div className="feature-card fade-delay-2">
    <i className="fa fa-search"></i>
    <h3>Semantic Gap Analyzer</h3>
    <p>Discover missing topics/entities your content needs to rank #1.</p>
  </div>
  <div className="feature-card fade-delay-3">
    <i className="fa fa-eye"></i>
    <h3>SERP Feature Assessment</h3>
    <p>Win Google snippets, images, video & shopping boxes — see what’s possible for your keywords.</p>
  </div>
  <div className="feature-card fade-delay-4">
    <i className="fa fa-robot"></i>
    <h3>AI SEO Autofix</h3>
    <p>Fix SEO issues instantly with AI: meta tags, alt texts, links & more.</p>
  </div>
  <div className="feature-card fade-delay-5">
    <i className="fa fa-shield"></i>
    <h3>Security Health Check</h3>
    <p>Scan for SSL, cookies, security headers, privacy, and overall website safety.</p>
  </div>
</div>


            {/* Call to action */}
            <div className="landing-cta">
              <Link to="/app/login" className="cta-btn outline">Login</Link>
              <Link to="/app/register" className="cta-btn neon-btn">Get Started Free</Link>
            </div>

            {/* Divider */}
            <div className="neon-divider"><span>FAQ</span></div>
            <div className="landing-faq">
              {faqs.map((faq, idx) => (
                <details className="faq-item" key={idx}>
                  <summary>{faq.q}</summary>
                  <div>{faq.a}</div>
                </details>
              ))}
            </div>
            <div className="neon-divider contact-divider"><span>Contact Us</span></div>
            <div className="landing-contact">
              <h3>Contact Our Team</h3>
              <p>
                Reach us any time at<br />
                <a href="mailto:secureseoinsightsteam@gmail.com">secureseoinsightsteam@gmail.com</a>
              </p>
              <p>
                <i className="fa fa-envelope"></i>
                Or connect on Twitter: <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">@SEO_Insights</a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
