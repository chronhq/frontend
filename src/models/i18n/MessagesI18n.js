import BaseI18n from './BaseI18n';

export default class MessagesI18n extends BaseI18n {
  getInventors = inventors => inventors.reduce((prev, p) => (typeof this.persons[p] === 'undefined'
    ? prev
    : [...prev, this.persons[p][this.nameSelector]]), []);

  invention(fact) {
    const description = typeof fact.description === 'string'
      ? fact.description.replace(/\u00a0/g, ' ')
      : 'Missing fact description';
    return {
      id: fact.id,
      key: `in_${fact.id}`,
      name: fact[this.nameSelector],
      inventDate: fact.inventDate,
      description,
      inventors: this.getInventors(fact.inventor).join(', '),
    };
  }

  welcomePerson(person) {
    const name = person[this.nameSelector];
    if (person.birthPlace in this.cities) {
      console.log(this.cities[person.birthPlace]);
      const place = this.cities[person.birthPlace].location.name;
      switch (this.lng) {
        case 'en': return `${name} was born in ${place} in ${person.birthDate}`;
        default: return `В ${place} родился(ась) ${name} в ${person.birthDate}`;
      }
    }
    switch (this.lng) {
      case 'en': return `${name} was born in ${person.birthDate}`;
      default: return `${person.birthDate} родился(ась) ${name}`;
    }
  }

  farewellPerson(person) {
    const name = person[this.nameSelector];
    if (person.deathPlace in this.cities) {
      const place = this.cities[person.deathPlace].location.name;
      switch (this.lng) {
        case 'en': return `${name} died in ${place} in ${person.deathDate}`;
        default: return `В '${place} умер(ла) ${name} в ${person.deathDate}`;
      }
    }
    switch (this.lng) {
      case 'en': return `${name} died in ${person.deathDate}`;
      default: return `${person.deathDate} умер(ла) ${name}`;
    }
  }

  person(person, type) {
    const occasion = type === 'birth'
      ? this.welcomePerson(person)
      : this.farewellPerson(person);
    return {
      id: person.id,
      key: `person_${type}_${person.id}`,
      occasion,
      birthDate: person.birthDate ? person.birthDate : '????',
      deathDate: person.deathDate ? person.deathDate : '????',
    };
  }
}
