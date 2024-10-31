import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo.png" alt="Logo da Igreja" className="logo" />
        <div className="header-title">
          <h1>Igreja de Cristo Unida em Moçambique</h1>
          <h2>Ex-Missão American Board</h2>
        </div>
      </div>
      <div className="header-nav">
        <div className="language-menu">
          <button>PT</button>
          <button>EN</button>
        </div>
        <img src="/avatar.png" alt="Avatar" className="avatar" />
      </div>
    </header>
  );
}
