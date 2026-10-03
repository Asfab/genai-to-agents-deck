// Who presents what. Edit names/links here; the title, act dividers, agenda and thank-you slide all read from this.
// acts: 1 GenAI · 2 Prompting · 3 Agents · 4 Industry. Act 1 is shared: Asfab slides 3–14, Pranav from 'The model landscape'.
// label: what the thank-you card says this person covered.
export const presenters = [
  { name: 'Asfab K', role: 'Technical Lead, IBM', acts: [1, 3], label: 'How LLMs work · AI Agents', linkedin: 'linkedin.com/in/asfab', github: 'github.com/Asfab' },
  { name: 'Pranav K S', role: 'Senior Software Engineer, IBM', acts: [1, 2, 4], label: 'GenAI in practice · Prompting · Industry', linkedin: 'linkedin.com/in/pranavnssce', github: '' },
]

export const presentersFor = (act) => presenters.filter((p) => p.acts.includes(act))
