import React from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home, ShieldAlert } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const eventId = 'err-' + Date.now();
    this.setState({ errorInfo, eventId });
    console.error('[ErrorBoundary caught error]', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    try {
      sessionStorage.removeItem('bricolemoi_chunk_reload');
    } catch (e) {}
    window.location.href = window.location.pathname + '?_t=' + Date.now();
  };

  handleResetAndClear = () => {
    try {
      sessionStorage.clear();
      localStorage.removeItem('bricolemoi_sync_payload');
      localStorage.removeItem('bricolemoi_interventions_cache');
      localStorage.removeItem('bricolemoi_my_unlocked_leads');
      localStorage.removeItem('bricolemoi_my_created_leads');
    } catch (e) {}
    window.location.href = '/?_t=' + Date.now();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
          <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center relative overflow-hidden">
            {/* Top decorative badge */}
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-[11px] font-mono font-black border border-amber-200">
                Bouclier de Sécurité Actif
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                Une interruption a été interceptée
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                BricoleMoi a sécurisé vos données locales pour éviter toute perte. Vous pouvez relancer la session immédiatement.
              </p>
            </div>

            {/* Error Message Snippet (Clean Accordion / Pre) */}
            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-mono text-slate-700 overflow-x-auto max-h-28">
                <span className="text-[10px] text-amber-600 font-bold block mb-1">Rapport technique :</span>
                {this.state.error.toString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recharger l'application</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetAndClear}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-slate-500" />
                <span>Auto-réparation &amp; Reset</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
