import Link from 'next/link';

interface HeaderProps {
  activeTab?: 'comunidad' | 'mapa-tecnicas' | 'perfil';
}

export function Header({ activeTab = 'comunidad' }: HeaderProps) {
  return (
    <header className="border-b-2 sticky top-0 z-50" style={{ backgroundColor: '#FEF7F3', borderBottomColor: '#D1924F' }}>
      <div className="w-full px-6 py-4 flex items-center justify-between">

        <span className="text-2xl font-bold" style={{ color: '#D1924F', fontFamily: 'var(--font-playfair)' }}>
        Startist
        </span>


        <nav className="flex items-center gap-8 flex-1 justify-center">
          <Link
            href="/comunidad"
            className={`text-sm font-medium transition-colors ${
              activeTab === 'comunidad'
                ? 'text-orange-400'
                : 'text-gray-600 hover:text-orange-400'
            }`}
            style={{
              color: activeTab === 'comunidad' ? '#D1924F' : '#5D5B5F',
            }}
          >
            COMUNIDAD
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors ${
              activeTab === 'mapa-tecnicas'
                ? 'text-orange-400'
                : 'text-gray-600 hover:text-orange-400'
            }`}
            style={{
              color: activeTab === 'mapa-tecnicas' ? '#D1924F' : '#5D5B5F',
            }}
          >
            MAPA DE TÉCNICAS
          </Link>
        </nav>


        <Link href="/perfil" className="flex-shrink-0">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold border-2"
            style={{ backgroundColor: '#F2D8BD', borderColor: '#D1924F' }}
          >
            <img src="/UsuarioPerfil_Header.png" alt="Perfil" className="object-cover rounded-full" />
          </div>
        </Link>
      </div>
    </header>
  );
}
