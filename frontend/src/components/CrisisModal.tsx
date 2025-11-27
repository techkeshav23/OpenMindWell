import { X, Phone, Globe, ExternalLink, Heart } from 'lucide-react'

interface CrisisModalProps {
  open: boolean
  onClose: () => void
}

const crisisResources = {
  us: [
    { name: '988 Suicide & Crisis Lifeline', phone: '988', desc: 'Call or text 24/7', type: 'hotline' },
    { name: 'Crisis Text Line', phone: '741741', desc: 'Text HOME to 741741', type: 'text' },
    { name: 'SAMHSA Helpline', phone: '1-800-662-4357', desc: 'Mental health & substance abuse', type: 'hotline' },
  ],
  india: [
    { name: 'KIRAN Helpline', phone: '1800-599-0019', desc: 'Government free helpline 24/7', type: 'hotline' },
    { name: 'Vandrevala Foundation', phone: '1860-2662-345', desc: '24/7 multilingual support', type: 'hotline' },
    { name: 'iCall', phone: '9152987821', desc: 'Mon-Sat 8am-10pm', type: 'hotline' },
  ],
}

export default function CrisisModal({ open, onClose }: CrisisModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="absolute inset-x-2 bottom-2 top-auto sm:inset-4 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 
                      sm:max-w-lg sm:w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden
                      max-h-[85vh] sm:max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 sm:p-5 text-white flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Heart size={20} className="flex-shrink-0 sm:w-7 sm:h-7" />
              <div className="min-w-0">
                <h2 className="text-base sm:text-xl font-bold truncate">You're Not Alone</h2>
                <p className="text-red-100 text-xs sm:text-sm">Help is available 24/7</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg flex-shrink-0">
              <X size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-3 sm:space-y-6 overscroll-contain">
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-base">
            If you're in crisis, please reach out. You matter.
          </p>

          {/* US */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className="text-blue-500 flex-shrink-0 sm:w-4 sm:h-4" />
              <h3 className="font-semibold text-xs sm:text-base">United States</h3>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              {crisisResources.us.map((r) => (
                <a
                  key={r.name}
                  href={`tel:${r.phone}`}
                  className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200"
                >
                  <Phone size={14} className="text-red-500 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-base truncate">{r.name}</p>
                    <p className="text-[10px] sm:text-sm text-gray-500 truncate">{r.desc}</p>
                  </div>
                  <span className="font-bold text-green-600 text-xs sm:text-base flex-shrink-0">{r.phone}</span>
                </a>
              ))}
            </div>
          </div>

          {/* India */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} className="text-orange-500 flex-shrink-0 sm:w-4 sm:h-4" />
              <h3 className="font-semibold text-xs sm:text-base">India</h3>
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              {crisisResources.india.map((r) => (
                <a
                  key={r.name}
                  href={`tel:${r.phone}`}
                  className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200"
                >
                  <Phone size={14} className="text-red-500 flex-shrink-0 sm:w-4 sm:h-4" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-base truncate">{r.name}</p>
                    <p className="text-[10px] sm:text-sm text-gray-500 truncate">{r.desc}</p>
                  </div>
                  <span className="font-bold text-green-600 text-xs sm:text-base flex-shrink-0">{r.phone}</span>
                </a>
              ))}
            </div>
          </div>

          {/* International */}
          <a
            href="https://www.iasp.info/resources/Crisis_Centres/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 text-xs sm:text-base"
          >
            <ExternalLink size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
            <span className="truncate">Find crisis centers worldwide (IASP)</span>
          </a>
        </div>

        {/* Footer */}
        <div className="p-2.5 sm:p-4 bg-gray-50 dark:bg-gray-800 text-center flex-shrink-0">
          <p className="text-[10px] sm:text-sm text-gray-500">Reaching out is a sign of strength 💚</p>
        </div>
      </div>
    </div>
  )
}
