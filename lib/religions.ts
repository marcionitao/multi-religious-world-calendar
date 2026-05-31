export type ReligionId =
  | "christianity"
  | "judaism"
  | "orthodox"
  | "islam"
  | "hinduism"
  | "chinese"

export type Religion = {
  id: ReligionId
  name: string
  nameOriginal?: string
  calendar: string
  colorVar: string // CSS variable reference
  colorClass: string // tailwind class using the token
  bgClass: string
  glyph: string // short unicode symbol used as minimalist mark
}

export const RELIGIONS: Religion[] = [
  {
    id: "christianity",
    name: "Cristianismo",
    nameOriginal: "Christianitas",
    calendar: "Calendário Gregoriano",
    colorVar: "var(--religion-christianity)",
    colorClass: "text-religion-christianity",
    bgClass: "bg-religion-christianity",
    glyph: "✦",
  },
  {
    id: "judaism",
    name: "Judaísmo",
    nameOriginal: "יַהֲדוּת",
    calendar: "Calendário Hebraico",
    colorVar: "var(--religion-judaism)",
    colorClass: "text-religion-judaism",
    bgClass: "bg-religion-judaism",
    glyph: "✡",
  },
  {
    id: "orthodox",
    name: "Cristianismo Ortodoxo",
    nameOriginal: "Ὀρθοδοξία",
    calendar: "Calendário Juliano",
    colorVar: "var(--religion-orthodox)",
    colorClass: "text-religion-orthodox",
    bgClass: "bg-religion-orthodox",
    glyph: "☦",
  },
  {
    id: "islam",
    name: "Islamismo",
    nameOriginal: "الإسلام",
    calendar: "Calendário Hijri",
    colorVar: "var(--religion-islam)",
    colorClass: "text-religion-islam",
    bgClass: "bg-religion-islam",
    glyph: "☾",
  },
  {
    id: "hinduism",
    name: "Hinduísmo",
    nameOriginal: "सनातन धर्म",
    calendar: "Panchangam",
    colorVar: "var(--religion-hinduism)",
    colorClass: "text-religion-hinduism",
    bgClass: "bg-religion-hinduism",
    glyph: "ॐ",
  },
  {
    id: "chinese",
    name: "Tradição Chinesa",
    nameOriginal: "中華傳統",
    calendar: "Calendário Lunar",
    colorVar: "var(--religion-chinese)",
    colorClass: "text-religion-chinese",
    bgClass: "bg-religion-chinese",
    glyph: "龍",
  },
]

export const RELIGION_BY_ID: Record<ReligionId, Religion> = RELIGIONS.reduce(
  (acc, r) => {
    acc[r.id] = r
    return acc
  },
  {} as Record<ReligionId, Religion>,
)

// Day-of-week names in each tradition with PT translation.
// Index 0 = Sunday, 6 = Saturday (to align with Gregorian Date.getDay()).
export const WEEKDAYS: Record<
  ReligionId | "gregorian",
  { original: string; pt: string; short: string }[]
> = {
  gregorian: [
    { original: "Domingo", pt: "Domingo", short: "Dom" },
    { original: "Segunda", pt: "Segunda", short: "Seg" },
    { original: "Terça", pt: "Terça", short: "Ter" },
    { original: "Quarta", pt: "Quarta", short: "Qua" },
    { original: "Quinta", pt: "Quinta", short: "Qui" },
    { original: "Sexta", pt: "Sexta", short: "Sex" },
    { original: "Sábado", pt: "Sábado", short: "Sáb" },
  ],
  christianity: [
    { original: "Dies Dominica", pt: "Dia do Senhor", short: "Dom" },
    { original: "Feria Secunda", pt: "Segunda", short: "Seg" },
    { original: "Feria Tertia", pt: "Terça", short: "Ter" },
    { original: "Feria Quarta", pt: "Quarta", short: "Qua" },
    { original: "Feria Quinta", pt: "Quinta", short: "Qui" },
    { original: "Feria Sexta", pt: "Sexta", short: "Sex" },
    { original: "Sabbatum", pt: "Sábado", short: "Sáb" },
  ],
  judaism: [
    { original: "Yom Rishon", pt: "Primeiro dia", short: "א" },
    { original: "Yom Sheni", pt: "Segundo dia", short: "ב" },
    { original: "Yom Shlishi", pt: "Terceiro dia", short: "ג" },
    { original: "Yom Revi'i", pt: "Quarto dia", short: "ד" },
    { original: "Yom Chamishi", pt: "Quinto dia", short: "ה" },
    { original: "Yom Shishi", pt: "Sexto dia", short: "ו" },
    { original: "Shabbat", pt: "Descanso", short: "ש" },
  ],
  orthodox: [
    { original: "Kyriakí", pt: "Domingo", short: "Κυ" },
    { original: "Deftéra", pt: "Segunda", short: "Δε" },
    { original: "Tríti", pt: "Terça", short: "Τρ" },
    { original: "Tetárti", pt: "Quarta", short: "Τε" },
    { original: "Pémpti", pt: "Quinta", short: "Πε" },
    { original: "Paraskeví", pt: "Sexta", short: "Πα" },
    { original: "Sávvato", pt: "Sábado", short: "Σά" },
  ],
  islam: [
    { original: "Yawm al-Ahad", pt: "Primeiro dia", short: "أحد" },
    { original: "Yawm al-Ithnayn", pt: "Segundo dia", short: "اثن" },
    { original: "Yawm ath-Thulatha", pt: "Terceiro dia", short: "ثلا" },
    { original: "Yawm al-Arbi'a", pt: "Quarto dia", short: "أرب" },
    { original: "Yawm al-Khamis", pt: "Quinto dia", short: "خمي" },
    { original: "Yawm al-Jumu'ah", pt: "Dia da reunião", short: "جمع" },
    { original: "Yawm as-Sabt", pt: "Descanso", short: "سبت" },
  ],
  hinduism: [
    { original: "Ravivāra", pt: "Dia do Sol", short: "रवि" },
    { original: "Somavāra", pt: "Dia da Lua", short: "सोम" },
    { original: "Maṅgalavāra", pt: "Dia de Marte", short: "मंग" },
    { original: "Budhavāra", pt: "Dia de Mercúrio", short: "बुध" },
    { original: "Guruvāra", pt: "Dia de Júpiter", short: "गुरु" },
    { original: "Śukravāra", pt: "Dia de Vênus", short: "शुक्र" },
    { original: "Śanivāra", pt: "Dia de Saturno", short: "शनि" },
  ],
  chinese: [
    { original: "Xīngqīrì 星期日", pt: "Dia do Sol", short: "日" },
    { original: "Xīngqīyī 星期一", pt: "Primeiro dia", short: "一" },
    { original: "Xīngqī'èr 星期二", pt: "Segundo dia", short: "二" },
    { original: "Xīngqīsān 星期三", pt: "Terceiro dia", short: "三" },
    { original: "Xīngqīsì 星期四", pt: "Quarto dia", short: "四" },
    { original: "Xīngqīwǔ 星期五", pt: "Quinto dia", short: "五" },
    { original: "Xīngqīliù 星期六", pt: "Sexto dia", short: "六" },
  ],
}
