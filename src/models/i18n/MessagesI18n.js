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
    switch (this.lng) {
      case 'en': return `${name}`;
      default: return `${name}`;
    }
  }

  farewellPerson(person) {
    const name = person[this.nameSelector];
    switch (this.lng) {
      case 'en': return `${name}`;
      default: return `${name}`;
    }
  }

  person(person, type) {
    let occasion;
    let location;
    let title;
    if (type === 'birth') {
      occasion = this.welcomePerson(person);
      location = this.cities[person.birthPlace]
        ? this.cities[person.birthPlace].location.name : '????';
      switch (this.lng) {
        case 'en': title = 'Born';
          break;
        default: title = 'Рождение';
      }
    } else {
      occasion = this.welcomePerson(person);
      location = this.cities[person.deathPlace]
        ? this.cities[person.deathPlace].location.name : '????';
      switch (this.lng) {
        case 'en': title = 'Passed';
          break;
        default: title = 'Смерть';
      }
    }

    return {
      id: person.id,
      key: `person_${type}_${person.id}`,
      title,
      occasion,
      birthDate: person.birthDate ? person.birthDate : '????',
      deathDate: person.deathDate ? person.deathDate : '????',
      location
    };
  }
}
