import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', gap: 16, textAlign: 'center',
      padding: '0 24px',
    }}>
      <h1 style={{ fontSize: 'clamp(64px,12vw,120px)', fontWeight: 800, color: '#7C3AED', lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: 22, fontWeight: 600 }}>Page not found</h2>
      <p style={{ color: '#9CA3AF', maxWidth: 320 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        marginTop: 8, padding: '11px 28px', background: '#7C3AED',
        color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 999,
      }}>
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
