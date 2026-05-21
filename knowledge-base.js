// ============================================================
//  ClassicaLens — Music Knowledge Base
//  VIBE ATHON Problem 12
// ============================================================

const MUSIC_KB = {
  traditions: [
    {
      id: 'carnatic',
      name: 'Carnatic Classical',
      subtitle: 'Soul of South India',
      region: 'south-asia',
      country: 'India (South)',
      period: '15th century – Present',
      flag: '🇮🇳',
      color: '#FF6B6B',
      emoji: '🎵',
      instruments: ['Veena', 'Mridangam', 'Violin', 'Flute', 'Ghatam'],
      moods: ['devotional', 'meditative', 'joyful', 'serene'],
      moodTags: ['🙏 Devotional', '🌸 Meditative', '☀️ Joyful'],
      keyArtists: ['M.S. Subbulakshmi', 'Balamuralikrishna', 'Lalgudi Jayaraman', 'T.N. Krishnan'],
      famousWorks: ['Bhaja Govindam', 'Sri Ragasudharse', 'Vatapi Ganapathim', 'Evari Bodhana'],
      culturalContext: 'Carnatic music is one of the oldest classical music systems in the world, rooted in Hindu religious traditions of South India — spanning Tamil Nadu, Karnataka, Andhra Pradesh, and Kerala. It follows an intricate system of ragas (melodic frameworks) and talas (rhythmic cycles). Historically performed in temples and royal courts, today it thrives in concerts called kutcheris, particularly during the famous "December Season" in Chennai.',
      beginnerExplanation: 'Imagine music as a structured conversation where every note, rhythm, and ornament has a purpose. In Carnatic music, a "raga" is like a color palette that sets the entire emotional tone — there are ragas for morning freshness, evening calm, and deep devotion. The rhythmic patterns called "talas" keep everything locked in sync, like an intricate clock. Even simple-sounding melodies hide layers of mathematical beauty.',
      characteristics: ['Complex raga framework', 'Tala rhythmic cycles', 'Gamakas (ornamental slides)', 'Improvised passages (manodharma)'],
      tags: ['raga', 'tala', 'sruti', 'devotional', 'india', 'classical'],
      relatedTraditions: ['hindustani', 'gagaku']
    },
    {
      id: 'hindustani',
      name: 'Hindustani Classical',
      subtitle: 'Living Tradition of North India',
      region: 'south-asia',
      country: 'India (North)',
      period: '13th century – Present',
      flag: '🇮🇳',
      color: '#4ECDC4',
      emoji: '🎸',
      instruments: ['Sitar', 'Tabla', 'Sarod', 'Bansuri', 'Santoor'],
      moods: ['romantic', 'meditative', 'heroic', 'serene', 'devotional'],
      moodTags: ['💫 Mystical', '🌙 Romantic', '🕊️ Peaceful'],
      keyArtists: ['Ravi Shankar', 'Bismillah Khan', 'Zakir Hussain', 'Amjad Ali Khan', 'Hariprasad Chaurasia'],
      famousWorks: ['Raag Bhairav', 'Raag Yaman', 'Raag Darbari Kanada', 'Raag Bhimpalasi'],
      culturalContext: 'Hindustani music developed in North India, deeply influenced by Persian and Mughal court culture from the 12th century onward. Unlike Carnatic music, it strongly emphasizes improvisation — a musician may explore a single raga for hours. Major styles include Dhrupad (ancient and austere), Khyal (lyrical and creative), Thumri (romantic and light), and instrumental traditions.',
      beginnerExplanation: 'Think of Hindustani music as a slow, meditative journey. A performance begins with "alap" — a gentle, free-form exploration of the raga\'s notes, almost like musical breathing. Gradually, rhythm enters and everything builds toward an electrifying crescendo. Each raga belongs to a specific time of day or season — some are meant for dawn, others for midnight.',
      characteristics: ['Alap (free-form introduction)', 'Extensive improvisation', 'Time-of-day ragas', 'Persian influences'],
      tags: ['raga', 'alap', 'sitar', 'north-india', 'improvisation'],
      relatedTraditions: ['carnatic', 'maqam']
    },
    {
      id: 'baroque',
      name: 'Baroque Classical',
      subtitle: "Europe's Age of Ornament",
      region: 'europe',
      country: 'Germany, Italy, France',
      period: '1600 – 1750',
      flag: '🇩🇪',
      color: '#F7DC6F',
      emoji: '🎻',
      instruments: ['Harpsichord', 'Violin', 'Cello', 'Organ', 'Lute'],
      moods: ['majestic', 'contemplative', 'energetic', 'spiritual'],
      moodTags: ['👑 Majestic', '⛪ Spiritual', '⚡ Energetic'],
      keyArtists: ['Johann Sebastian Bach', 'George Frideric Handel', 'Antonio Vivaldi', 'Henry Purcell'],
      famousWorks: ['Four Seasons (Vivaldi)', 'Brandenburg Concertos (Bach)', 'Messiah (Handel)', 'Water Music (Handel)'],
      culturalContext: 'Baroque music emerged during Europe\'s most dramatic period of religious, political, and artistic transformation. Characterized by elaborate ornamentation and counterpoint (multiple simultaneous melodies weaving together), it was composed for churches, royal courts, and opera houses. The word "baroque" originally meant "irregular pearl" — hinting at its ornate complexity.',
      beginnerExplanation: 'Baroque music is like an intricate, beautiful tapestry. Multiple melody lines weave together simultaneously — like several voices all speaking at once but somehow making perfect, harmonious sense. Bach was a master of this "counterpoint." If you\'ve ever heard music in a grand European cathedral or dramatic film, there\'s a good chance it echoes the Baroque style.',
      characteristics: ['Basso continuo', 'Counterpoint technique', 'Ornamental melodies', 'Terraced dynamics'],
      tags: ['bach', 'baroque', 'counterpoint', 'european', 'harpsichord'],
      relatedTraditions: ['romantic', 'celtic']
    },
    {
      id: 'romantic',
      name: 'Romantic Era',
      subtitle: 'Music of Deep Emotion',
      region: 'europe',
      country: 'Germany, Austria, Russia',
      period: '1820 – 1900',
      flag: '🇦🇹',
      color: '#E74C3C',
      emoji: '🎹',
      instruments: ['Piano', 'Full Orchestra', 'Violin', 'Cello'],
      moods: ['passionate', 'nostalgic', 'dramatic', 'lyrical'],
      moodTags: ['❤️ Passionate', '🌧️ Nostalgic', '🎭 Dramatic'],
      keyArtists: ['Ludwig van Beethoven', 'Frédéric Chopin', 'Franz Liszt', 'Pyotr Tchaikovsky'],
      famousWorks: ['Moonlight Sonata (Beethoven)', 'Swan Lake (Tchaikovsky)', 'Nocturne Op. 9 (Chopin)', 'Symphony No. 5 (Beethoven)'],
      culturalContext: 'The Romantic era was a deliberate reaction against the formal structures of the Classical period (Mozart, Haydn). Composers began expressing deep personal emotions, nationalism, and grand narratives. Orchestras grew enormously — from 30 to 100+ musicians. "Program music" (music that tells a story) flourished. Nationalism turned composers toward their folk roots, giving us distinct Russian, Hungarian, and Czech voices.',
      beginnerExplanation: 'If Baroque is intricate tapestry, Romantic music is a powerful emotional painting. This is the music that swells, makes your heart race, or brings quiet tears. Chopin\'s nocturnes feel like reading someone\'s private diary — intimate and searching. Beethoven\'s symphonies feel like storms breaking and sunlight returning. Big orchestras, big feelings — the Romantic era at its finest.',
      characteristics: ['Large orchestral forces', 'Extreme dynamic range', 'Nationalism and folk influences', 'Program music (storytelling)'],
      tags: ['romantic', 'beethoven', 'chopin', 'orchestra', 'emotional'],
      relatedTraditions: ['baroque', 'flamenco']
    },
    {
      id: 'flamenco',
      name: 'Flamenco',
      subtitle: 'Fire and Soul of Andalusia',
      region: 'europe',
      country: 'Spain (Andalusia)',
      period: '18th century – Present',
      flag: '🇪🇸',
      color: '#E67E22',
      emoji: '💃',
      instruments: ['Flamenco Guitar', 'Castanets', 'Palmas (Handclapping)', 'Voice'],
      moods: ['passionate', 'melancholic', 'fierce', 'joyful'],
      moodTags: ['🔥 Fierce', '😢 Melancholic', '💃 Passionate'],
      keyArtists: ['Paco de Lucía', 'Camarón de la Isla', 'Sara Baras', 'Diego el Cigala'],
      famousWorks: ['Entre dos Aguas', 'La Leyenda del Tiempo', 'Mediterráneo', 'Soleá por Bulería'],
      culturalContext: 'Flamenco was born in the marginalized neighborhoods of Andalusia — an art of Roma (Gitano), Moorish, and Jewish communities expressing joy, grief, and defiance. It blends singing (cante), guitar (toque), dance (baile), and handclapping percussion. Initially considered vulgar by the Spanish elite, it became Spain\'s greatest cultural export. UNESCO designated it an Intangible Cultural Heritage of Humanity.',
      beginnerExplanation: 'Flamenco is music and dance born from raw human emotion — joy, heartbreak, and survival. The guitar doesn\'t just accompany; it speaks back. The singer doesn\'t just sing; they cry out with their whole being. "Duende" is the spirit that makes flamenco transcendent — it can only happen in the moment, when performer and audience connect through shared vulnerability. It\'s deeply alive.',
      characteristics: ['Duende (deep emotional expression)', 'Complex rhythmic palos (styles)', 'Guitar-voice-dance improvisation', 'Melismatic cante'],
      tags: ['flamenco', 'spanish', 'guitar', 'dance', 'passionate'],
      relatedTraditions: ['tango', 'maqam']
    },
    {
      id: 'guqin',
      name: 'Guqin Tradition',
      subtitle: "The Scholar's Instrument of China",
      region: 'east-asia',
      country: 'China',
      period: '3000+ years old',
      flag: '🇨🇳',
      color: '#27AE60',
      emoji: '🎋',
      instruments: ['Guqin (7-string zither)', 'Xiao flute'],
      moods: ['contemplative', 'serene', 'melancholic', 'philosophical'],
      moodTags: ['🌿 Serene', '🤔 Philosophical', '🌊 Contemplative'],
      keyArtists: ['Guan Pinghu', 'Wu Jinglüe', 'Cheng Gongliang', 'Li Xiangting'],
      famousWorks: ['High Mountains and Flowing Water', 'Guangling Scattering', 'Plum Blossoms in Three Variations'],
      culturalContext: 'The guqin is a seven-stringed zither played in China for over 3,000 years — one of humanity\'s oldest musical instruments. Confucian scholars considered it an instrument of moral cultivation and philosophical reflection, never mere entertainment. It was so revered that Confucius himself is said to have played it. UNESCO listed guqin music as an Intangible Cultural Heritage in 2003.',
      beginnerExplanation: 'The guqin sounds like silence transformed into music. Its notes are soft, resonant, and fade gently — like ripples on still water. Ancient Chinese philosophers believed playing the guqin developed character and connected you to nature\'s deeper rhythms. Each piece tells a story: a mountain stream, morning mist over peaks, or a soldier\'s farewell. It\'s music that invites you to become still.',
      characteristics: ['Harmonics and whistle tones', 'Meditative slow tempo', 'Over 100 playing techniques', 'Philosophical program music'],
      tags: ['guqin', 'chinese', 'zither', 'contemplative', 'ancient'],
      relatedTraditions: ['gagaku', 'carnatic']
    },
    {
      id: 'gagaku',
      name: 'Gagaku',
      subtitle: "Japan's Imperial Court Music",
      region: 'east-asia',
      country: 'Japan',
      period: '7th century – Present',
      flag: '🇯🇵',
      color: '#8E44AD',
      emoji: '🌸',
      instruments: ['Sho (mouth organ)', 'Hichiriki (oboe)', 'Ryuteki (flute)', 'Biwa', 'Koto'],
      moods: ['ethereal', 'ceremonial', 'serene', 'timeless'],
      moodTags: ['✨ Ethereal', '🏯 Ceremonial', '🌸 Timeless'],
      keyArtists: ['Imperial Household Music Department', 'Sukeyasu Shiba', 'Togi family'],
      famousWorks: ['Etenraku', 'Ranjo', 'Bairo', 'Genjoraku'],
      culturalContext: 'Gagaku is the oldest surviving orchestral music in the world, preserved at the Japanese Imperial Court since the 7th century. It blends native Japanese music with influences from China, Korea, and Southeast Asia, frozen in time through court patronage. Performances typically accompany ancient court dances called bugaku. The same pieces performed today were performed over a thousand years ago.',
      beginnerExplanation: 'Imagine music from another dimension — slow, hovering, ancient. Gagaku sounds like stepping inside a Japanese scroll painting. The instruments create long, overlapping drones and tones that seem to exist outside of normal time. When you hear it, you are hearing something almost unchanged from the courts of Japan\'s Heian period. It doesn\'t so much move you as it transports you.',
      characteristics: ['Heterophonic texture', 'Extremely slow tempo', 'Microtonal pitch bending', 'Ritual and ceremonial context'],
      tags: ['gagaku', 'japanese', 'imperial', 'ancient', 'ceremonial'],
      relatedTraditions: ['guqin', 'carnatic']
    },
    {
      id: 'maqam',
      name: 'Maqam Tradition',
      subtitle: 'Modal Music of the Arab World',
      region: 'middle-east',
      country: 'Arab World, Turkey, Persia',
      period: '9th century – Present',
      flag: '🌙',
      color: '#F39C12',
      emoji: '🌙',
      instruments: ['Oud', 'Ney (flute)', 'Qanun', 'Riq (tambourine)', 'Violin'],
      moods: ['soulful', 'melancholic', 'joyful', 'spiritual', 'longing'],
      moodTags: ['🌙 Soulful', '💫 Longing', '🕌 Spiritual'],
      keyArtists: ['Umm Kulthum', 'Fairuz', 'Sabah Fakhri', 'Munir Bashir'],
      famousWorks: ['Enta Omri', 'Ya Rayah', 'Lamma Bada Yatathanna', 'El Atlal'],
      culturalContext: 'Maqam (Arabic for "position" or "place") is a system of musical modes used across the Arab world, Turkey, Persia, and Central Asia. Each maqam has its own characteristic intervals, phrases, and emotional qualities. The tradition values improvisation and "tarab" — the ecstatic state of being deeply moved by music. Audiences historically responded to great performances with audible exclamations of joy.',
      beginnerExplanation: 'Maqam music uses special scales with notes "in between" the standard Western ones — called microtones. This gives it a uniquely rich, aching quality that can feel simultaneously joyful and melancholic. When the legendary Umm Kulthum performed in Cairo, concerts would stretch for hours — she would repeat and improvise on the same phrase until the audience was overwhelmed with emotion. That overwhelming feeling is called tarab.',
      characteristics: ['Microtonal intervals', 'Improvised taqsim sections', 'Ornate melodic lines', 'Audience emotional participation (tarab)'],
      tags: ['maqam', 'arabic', 'oud', 'microtonal', 'improvisation'],
      relatedTraditions: ['flamenco', 'hindustani']
    },
    {
      id: 'tango',
      name: 'Argentine Tango',
      subtitle: "Buenos Aires' Dance of Longing",
      region: 'latin-america',
      country: 'Argentina',
      period: '1880s – Present',
      flag: '🇦🇷',
      color: '#C0392B',
      emoji: '🥀',
      instruments: ['Bandoneón', 'Violin', 'Piano', 'Double Bass', 'Voice'],
      moods: ['melancholic', 'passionate', 'nostalgic', 'sensual'],
      moodTags: ['🥀 Melancholic', '💕 Passionate', '🌆 Nostalgic'],
      keyArtists: ['Astor Piazzolla', 'Carlos Gardel', 'Aníbal Troilo', 'Osvaldo Pugliese'],
      famousWorks: ['La Cumparsita', 'Por una Cabeza', 'Libertango', 'Adiós Nonino'],
      culturalContext: 'Tango was born in the working-class conventillos (tenements) of Buenos Aires and Montevideo in the 1880s, blending African rhythms, Spanish and Italian immigrant music, and gaucho traditions. Considered scandalous for its close embrace and improvised dialogue, it was initially banned before sweeping Paris, then the world. UNESCO recognized it as an Intangible Cultural Heritage in 2009.',
      beginnerExplanation: 'Tango is the music of longing — for a lost love, a distant homeland, or a better life that keeps slipping away. The bandoneón (a German-made accordion) gives it that distinctive aching sound, like a sigh given musical form. Piazzolla revolutionized tango by adding jazz harmonies and classical structure, creating "nuevo tango" — proving the tradition could evolve without losing its soul.',
      characteristics: ['Syncopated rhythms', 'Bandoneón lead instrument', 'Deep emotional expression', 'Dance and music inseparable'],
      tags: ['tango', 'argentina', 'bandoneon', 'passionate', 'dance'],
      relatedTraditions: ['flamenco', 'romantic']
    },
    {
      id: 'celtic',
      name: 'Celtic Traditional',
      subtitle: 'Ancient Sound of Ireland & Scotland',
      region: 'europe',
      country: 'Ireland, Scotland, Wales',
      period: 'Ancient – Present',
      flag: '🇮🇪',
      color: '#2ECC71',
      emoji: '🍀',
      instruments: ['Uilleann Pipes', 'Fiddle', 'Tin Whistle', 'Celtic Harp', 'Bodhrán'],
      moods: ['joyful', 'melancholic', 'nostalgic', 'spirited'],
      moodTags: ['🍀 Spirited', '🌧️ Wistful', '🌊 Wild'],
      keyArtists: ['The Chieftains', 'Altan', 'Solas', 'Loreena McKennitt', 'Lunasa'],
      famousWorks: ["Danny Boy", 'The Foggy Dew', "Morrison's Jig", 'Ashokan Farewell'],
      culturalContext: "Celtic music is one of the world's great oral traditions — passed down through generations without written notation. It encompasses lively dance tunes (reels, jigs, hornpipes) and emotionally intense airs. Often played in social settings called sessions, it's inherently communal. Celtic music has influenced global folk music from Appalachian country to Québécois traditions, carried by the Irish and Scottish diaspora.",
      beginnerExplanation: "Celtic music makes you feel like you're standing on a windswept cliff looking out to a silver sea. The fiddle and pipes create melodies that seem to have been carried by the wind for centuries. Some tunes make you want to leap and dance; others make you quietly nostalgic for a home you've never visited. It's music with deep roots and a restless, free spirit — impossible to sit still through.",
      characteristics: ['Modal scales', 'Ornamentation (cuts, rolls, triplets)', 'Dance rhythms (jig, reel, hornpipe)', 'Communal session tradition'],
      tags: ['celtic', 'irish', 'scottish', 'fiddle', 'folk'],
      relatedTraditions: ['baroque', 'flamenco']
    },
    {
      id: 'bollywood',
      name: 'Bollywood Pop',
      subtitle: 'The Heartbeat of Indian Cinema',
      region: 'south-asia',
      country: 'India',
      period: '1930s – Present',
      flag: '🇮🇳',
      color: '#E84393',
      emoji: '🎬',
      instruments: ['Synthesizer', 'Tabla', 'Dholak', 'Strings', 'Drum Kit'],
      moods: ['joyful', 'passionate', 'romantic', 'energetic'],
      moodTags: ['💃 Energetic', '💖 Romantic', '✨ Cinematic'],
      keyArtists: ['A.R. Rahman', 'Lata Mangeshkar', 'Kishore Kumar', 'Arijit Singh'],
      famousWorks: ['Chaiyya Chaiyya', 'Tum Hi Ho', 'Kal Ho Naa Ho', 'Jai Ho'],
      culturalContext: 'Bollywood music is the backbone of India\'s massive film industry. While it is highly commercial pop music, it relies heavily on the foundations of Indian Classical Music (Hindustani and Carnatic). Many of the most famous Bollywood melodies are directly based on classical Ragas. For example, romantic songs often use Raag Yaman, while sad songs might use Raag Shivaranjani.',
      beginnerExplanation: 'Bollywood music is designed to make you feel big emotions quickly. It mixes Western pop beats with traditional Indian melodies. The amazing secret of Bollywood is its classical roots: behind the electronic drums and fast tempos, the singers are often using ancient classical scales (ragas) to pull at your heartstrings. It is the perfect bridge between modern pop and ancient heritage.',
      characteristics: ['High energy beats', 'Blend of Western and Indian instruments', 'Classical raga foundations', 'Highly melodic vocals'],
      tags: ['bollywood', 'indian-pop', 'cinema', 'fusion'],
      relatedTraditions: ['hindustani', 'carnatic']
    },
    {
      id: 'hollywood',
      name: 'Hollywood Cinematic',
      subtitle: 'The Sound of the Silver Screen',
      region: 'europe', // Roots are European orchestral
      country: 'United States',
      period: '1920s – Present',
      flag: '🇺🇸',
      color: '#0984E3',
      emoji: '🎥',
      instruments: ['Full Orchestra', 'Synthesizers', 'Brass Section', 'Timpani'],
      moods: ['majestic', 'dramatic', 'heroic', 'emotional'],
      moodTags: ['🦸 Heroic', '💥 Dramatic', '🌌 Epic'],
      keyArtists: ['Hans Zimmer', 'John Williams', 'Ennio Morricone', 'Howard Shore'],
      famousWorks: ['Star Wars Theme', 'Time (Inception)', 'The Lord of the Rings Suite', 'Jurassic Park Theme'],
      culturalContext: 'Hollywood cinematic music evolved directly from the European Romantic Classical era (think Wagner and Tchaikovsky). Early film composers brought sweeping orchestral traditions to Los Angeles. Today, film scores blend massive classical orchestras with modern electronic synthesizers to create "epic" emotional soundscapes.',
      beginnerExplanation: 'When you hear a movie score that gives you goosebumps, you are actually listening to modern Romantic Classical music. Film composers use the same techniques that Beethoven and Wagner used hundreds of years ago—like "leitmotifs" (a specific musical theme for a specific character, like Darth Vader\'s march). Hollywood keeps the massive, emotional classical orchestra alive today.',
      characteristics: ['Massive orchestral dynamics', 'Leitmotif themes', 'Electronic and acoustic blending', 'Programmatic storytelling'],
      tags: ['hollywood', 'cinematic', 'orchestral', 'film-score'],
      relatedTraditions: ['romantic', 'baroque']
    }
  ],

  regions: [
    { id: 'south-asia', name: 'South Asia', emoji: '🌏', color: '#FF6B6B', traditions: ['carnatic', 'hindustani', 'bollywood'] },
    { id: 'europe', name: 'Europe / West', emoji: '🌍', color: '#F7DC6F', traditions: ['baroque', 'romantic', 'flamenco', 'celtic', 'hollywood'] },
    { id: 'east-asia', name: 'East Asia', emoji: '🌏', color: '#8E44AD', traditions: ['guqin', 'gagaku'] },
    { id: 'middle-east', name: 'Middle East', emoji: '🌍', color: '#F39C12', traditions: ['maqam'] },
    { id: 'latin-america', name: 'Latin America', emoji: '🌎', color: '#C0392B', traditions: ['tango'] }
  ],

  moods: [
    { id: 'devotional', label: '🙏 Devotional', traditions: ['carnatic', 'hindustani', 'gagaku'] },
    { id: 'meditative', label: '🧘 Meditative', traditions: ['carnatic', 'hindustani', 'guqin', 'gagaku'] },
    { id: 'joyful', label: '☀️ Joyful', traditions: ['carnatic', 'celtic', 'flamenco', 'bollywood'] },
    { id: 'passionate', label: '🔥 Passionate', traditions: ['flamenco', 'tango', 'romantic', 'bollywood'] },
    { id: 'melancholic', label: '🌧️ Melancholic', traditions: ['tango', 'celtic', 'maqam', 'flamenco'] },
    { id: 'majestic', label: '👑 Majestic', traditions: ['baroque', 'gagaku', 'hollywood'] },
    { id: 'nostalgic', label: '💭 Nostalgic', traditions: ['tango', 'celtic', 'romantic'] },
    { id: 'ethereal', label: '✨ Ethereal', traditions: ['gagaku', 'guqin'] },
    { id: 'soulful', label: '💫 Soulful', traditions: ['maqam', 'flamenco'] },
    { id: 'dramatic', label: '🎭 Dramatic', traditions: ['romantic', 'baroque', 'hollywood'] },
    { id: 'energetic', label: '⚡ Energetic', traditions: ['bollywood', 'flamenco', 'celtic'] }
  ],

  instruments: [
    { name: 'Sitar', tradition: 'hindustani', emoji: '🪕' },
    { name: 'Tabla', tradition: 'hindustani', emoji: '🥁' },
    { name: 'Veena', tradition: 'carnatic', emoji: '🎸' },
    { name: 'Mridangam', tradition: 'carnatic', emoji: '🥁' },
    { name: 'Oud', tradition: 'maqam', emoji: '🎵' },
    { name: 'Guqin', tradition: 'guqin', emoji: '🎋' },
    { name: 'Bandoneón', tradition: 'tango', emoji: '🪗' },
    { name: 'Uilleann Pipes', tradition: 'celtic', emoji: '🎶' },
    { name: 'Harpsichord', tradition: 'baroque', emoji: '🎹' },
    { name: 'Sho', tradition: 'gagaku', emoji: '🎵' }
  ],

  // Pattern matching profiles for audio analysis simulation
  audioProfiles: {
    carnatic: { tempoMin: 60, tempoMax: 200, freqProfile: 'mid-high', energy: 0.6, keywords: ['devotional', 'south', 'india', 'classical'] },
    hindustani: { tempoMin: 30, tempoMax: 180, freqProfile: 'mid', energy: 0.5, keywords: ['north', 'india', 'raga', 'sitar'] },
    baroque: { tempoMin: 80, tempoMax: 160, freqProfile: 'mid', energy: 0.65, keywords: ['baroque', 'counterpoint', 'european'] },
    romantic: { tempoMin: 40, tempoMax: 160, freqProfile: 'full', energy: 0.8, keywords: ['romantic', 'passionate', 'orchestral'] },
    flamenco: { tempoMin: 80, tempoMax: 200, freqProfile: 'mid-high', energy: 0.85, keywords: ['flamenco', 'spanish', 'guitar'] },
    guqin: { tempoMin: 20, tempoMax: 60, freqProfile: 'mid', energy: 0.2, keywords: ['chinese', 'zither', 'contemplative'] },
    gagaku: { tempoMin: 10, tempoMax: 40, freqProfile: 'low-mid', energy: 0.15, keywords: ['japanese', 'imperial', 'ceremonial'] },
    maqam: { tempoMin: 50, tempoMax: 150, freqProfile: 'mid', energy: 0.55, keywords: ['arabic', 'maqam', 'oud'] },
    tango: { tempoMin: 60, tempoMax: 120, freqProfile: 'mid', energy: 0.7, keywords: ['tango', 'argentina', 'bandoneon'] },
    celtic: { tempoMin: 100, tempoMax: 220, freqProfile: 'mid-high', energy: 0.75, keywords: ['celtic', 'irish', 'fiddle'] },
    bollywood: { tempoMin: 100, tempoMax: 160, freqProfile: 'full', energy: 0.9, keywords: ['bollywood', 'pop', 'india', 'film'] },
    hollywood: { tempoMin: 60, tempoMax: 140, freqProfile: 'full', energy: 0.85, keywords: ['hollywood', 'cinematic', 'epic', 'orchestra'] }
  },

  // Get tradition by ID
  getTradition(id) { return this.traditions.find(t => t.id === id); },

  // Get all traditions for a region
  getByRegion(regionId) { return this.traditions.filter(t => t.region === regionId); },

  // Get all traditions matching a mood
  getByMood(mood) { return this.traditions.filter(t => t.moods.includes(mood)); },

  // Search across all fields
  search(query) {
    const q = query.toLowerCase();
    return this.traditions.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.country.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q)) ||
      t.moods.some(m => m.includes(q)) ||
      t.instruments.some(i => i.toLowerCase().includes(q)) ||
      t.keyArtists.some(a => a.toLowerCase().includes(q))
    );
  },

  // Get related traditions
  getRelated(id) {
    const t = this.getTradition(id);
    if (!t) return [];
    return (t.relatedTraditions || []).map(rid => this.getTradition(rid)).filter(Boolean);
  }
};

// Make globally available
window.MUSIC_KB = MUSIC_KB;
