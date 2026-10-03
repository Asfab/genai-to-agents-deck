// Who presents what. Edit names/links here; the title, act dividers, agenda and thank-you slide all read from this.
// acts: 1 GenAI · 2 Prompting · 3 Agents · 4 Industry
export const presenters = [
  { name: 'Asfab K', role: 'Technical Lead, IBM', acts: [1, 3], linkedin: 'linkedin.com/in/asfab', github: 'github.com/Asfab' },
  { name: 'Pranav K S', role: 'Senior Software Engineer, IBM', acts: [2, 4], linkedin: 'linkedin.com/in/pranavnssce', github: '' },
]

export const presentersFor = (act) => presenters.filter((p) => p.acts.includes(act))
