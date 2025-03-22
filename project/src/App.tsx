import React, { useState } from 'react';
import { Shield, Users, ArrowUpRight, ArrowDownRight, UserMinus, Medal, Clock, Car, Zap, Copy, CheckCheck, Plus, Trash2 } from 'lucide-react';

interface Protocol {
  date: string;
  reminderText: string;
  topics: string[];
  wishes: string[];
  departmentChanges: string[];
  promotions: string[];
  demotions: string[];
  dismissals: string[];
  medals: string[];
  signature: {
    name: string;
    rank: string;
    department: string;
  };
}

function App() {
  const [protocol, setProtocol] = useState<Protocol>({
    date: new Date().toLocaleDateString('de-DE'),
    reminderText: 'Denkt an eine regelmäßige Aktivität im Dienst. Bei anhaltend geringer Aktivität können Sanktionen erfolgen und Beförderungen sind nur bei ausreichendem Engagement möglich. Zudem gehen alle Polizisten um 19 Uhr zur Besprechung außer Dienst, mit Ausnahme eines Verantwortlichen für die Türen.',
    topics: [
    ],
    wishes: [],
    departmentChanges: [],
    promotions: [],
    demotions: [],
    dismissals: [],
    medals: [],
    signature: {
      name: '',
      rank: '',
      department: 'Police Leadership'
    }
  });

  const [copied, setCopied] = useState(false);

  const handleListChange = (field: keyof Protocol, index: number, value: string) => {
    setProtocol(prev => ({
      ...prev,
      [field]: prev[field].map((item: string, i: number) => i === index ? value : item)
    }));
  };

  const addListItem = (field: keyof Protocol) => {
    setProtocol(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeListItem = (field: keyof Protocol, index: number) => {
    setProtocol(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  const generateDiscordText = () => {
    const text = `**Protokoll der Polizeibesprechung vom ${protocol.date}**
 [ @Police  ]

**Erinnerung-Spielzeit:**
${protocol.reminderText}

**Themen:**
${protocol.topics.map(topic => `- ${topic}`).join('\n')}

**Wünsche der Polizisten:**
${protocol.wishes.length > 0 ? protocol.wishes.map(wish => `- ${wish}`).join('\n') : '- -'}

**Dezernatswechsel:**
${protocol.departmentChanges.length > 0 ? protocol.departmentChanges.map(change => `- ${change}`).join('\n') : '- -'}

**Upranks:**
${protocol.promotions.length > 0 ? protocol.promotions.map(promotion => `- ${promotion}`).join('\n') : '- -'}

**Deranks:**
${protocol.demotions.length > 0 ? protocol.demotions.map(demotion => `- ${demotion}`).join('\n') : '- -'}

**Entlassungen:**
${protocol.dismissals.length > 0 ? protocol.dismissals.map(dismissal => `- ${dismissal}`).join('\n') : '- -'}

**Orden:**
${protocol.medals.length > 0 ? protocol.medals.map(medal => `- ${medal}`).join('\n') : '- -'}

Mit freundlichen Grüßen
${protocol.signature.name}
${protocol.signature.rank}
${protocol.signature.department}`;

    return text;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateDiscordText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const EditableList = ({ title, icon: Icon, items, field }: { 
    title: string; 
    icon: React.ElementType; 
    items: string[];
    field: keyof Protocol;
  }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <button
          onClick={() => addListItem(field)}
          className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Hinzufügen</span>
        </button>
      </div>
      <div className="space-y-2">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleListChange(field, index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`${title} eingeben...`}
              />
              <button
                onClick={() => removeListItem(field, index)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Keine Einträge vorhanden</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Protokoll der Polizeibesprechung</h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Datum</h2>
              </div>
              <input
                type="text"
                value={protocol.date}
                onChange={(e) => setProtocol(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Erinnerung-Spielzeit</h2>
              </div>
              <textarea
                value={protocol.reminderText}
                onChange={(e) => setProtocol(prev => ({ ...prev, reminderText: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            <EditableList title="Themen" icon={Car} items={protocol.topics} field="topics" />
            <EditableList title="Wünsche der Polizisten" icon={Users} items={protocol.wishes} field="wishes" />
            <EditableList title="Dezernatswechsel" icon={ArrowUpRight} items={protocol.departmentChanges} field="departmentChanges" />
            <EditableList title="Upranks" icon={ArrowUpRight} items={protocol.promotions} field="promotions" />
            <EditableList title="Deranks" icon={ArrowDownRight} items={protocol.demotions} field="demotions" />
            <EditableList title="Entlassungen" icon={UserMinus} items={protocol.dismissals} field="dismissals" />
            <EditableList title="Orden" icon={Medal} items={protocol.medals} field="medals" />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Unterschrift</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={protocol.signature.name}
                    onChange={(e) => setProtocol(prev => ({ 
                      ...prev, 
                      signature: { ...prev.signature, name: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rang</label>
                  <input
                    type="text"
                    value={protocol.signature.rank}
                    onChange={(e) => setProtocol(prev => ({
                      ...prev,
                      signature: { ...prev.signature, rank: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Abteilung</label>
                  <input
                    type="text"
                    value={protocol.signature.department}
                    onChange={(e) => setProtocol(prev => ({
                      ...prev,
                      signature: { ...prev.signature, department: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discord Preview Panel */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Discord Vorschau</h2>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-5 h-5" />
                  <span>Kopiert!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Für Discord kopieren</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-[#36393f] text-gray-100 p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">{generateDiscordText()}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;