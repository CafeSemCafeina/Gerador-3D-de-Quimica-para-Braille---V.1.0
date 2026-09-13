import { Mail, GraduationCap } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../icons/SocialIcons';
import { iconeAcessibilidade } from '../../data/assets';
import { CONTATOS_EMAILS } from '../../data/equipe';

const Footer = ({ theme }) => (
  <footer className="bg-slate-900 text-slate-300 py-8 px-6 mt-auto">
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center space-x-4">
        <img src={iconeAcessibilidade} alt="Símbolo de Acessibilidade" className="w-10 h-10 object-contain opacity-80 flex-shrink-0" />
        <div className="text-left">
          <h3 className="text-base sm:text-lg font-bold text-white">Química ao Alcance das Mãos:</h3>
          <p className="text-sm text-slate-400 mb-1">Gerador 3D de Química para Braille</p>
          <p className="text-xs text-slate-500">
            Criado por <a href="https://www.linkedin.com/in/andre-gaito-2a58151b1/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{ color: theme.corPrincipal === '#511576' ? '#a0f658' : theme.corPrincipal }}>André Vinnicios S. Gaito</a>
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <a href={`mailto:${CONTATOS_EMAILS}`} aria-label="Enviar E-mail" className="text-slate-400 hover:text-white transition-colors"><Mail className="w-6 h-6" /></a>
        <a href="http://lattes.cnpq.br/9008126975057063" target="_blank" rel="noopener noreferrer" aria-label="Lattes" className="text-slate-400 hover:text-white transition-colors"><GraduationCap className="w-6 h-6" /></a>
        <a href="https://www.instagram.com/andre_gaito/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors"><InstagramIcon className="w-6 h-6" /></a>
        <a href="https://github.com/andregaito/Gerador-3D-de-Quimica-para-Braille---V.1.0" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors"><GithubIcon className="w-6 h-6" /></a>
        <a href="https://www.linkedin.com/in/andre-gaito-2a58151b1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors"><LinkedinIcon className="w-6 h-6" /></a>
      </div>
    </div>
  </footer>
);

export default Footer;
