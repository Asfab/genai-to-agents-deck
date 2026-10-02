// Who presents what. Edit names/links here; the title, act dividers and thank-you slide all read from this.
// acts: 1 GenAI · 2 Prompting · 3 Agents · 4 Industry
export const presenters = [
  { name: 'Asfab K', role: 'Technical Lead, IBM', acts: [1, 3], linkedin: '', github: 'github.com/Asfab' },
  { name: 'Pranav K S', role: 'Senior Software Engineer, IBM', acts: [2], linkedin: '', github: '' },
  { name: 'Najeeb P', role: 'Technical Lead, IBM', acts: [4], linkedin: '', github: '' },
]

export const presentersFor = (act) => presenters.filter((p) => p.acts.includes(act))
