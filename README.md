The first rule is, **do not** fork this repo, clone it or use it as template.

The second rule is, **do not** fork this repo, clone it or use it as template.

Good luck! 🔥

# Weglot JS Assessment

## Technical skills (~1h)

Vous devez souvent organiser des réunions de 60 minutes avec vos collègues,
seulement tout le monde a un emploi du temps très chargé. Google agenda vous
donne les indisponibilités de tout le monde, pourquoi ne pas faire en sorte de
trouver ça automatiquement ?

### Format des données

Vous trouverez les données dans le dossier data.

**Entrée**

Chaque ligne est une plage horaire indisponible, au format `d hh:mm-hh:mm`.

`d` est le numéro du jour de la semaine (1 à 5, lundi au vendredi).

`hh:mm-hh:mm` est la plage horaire de ce jour, début et fin incluses.

Les horaires de travail sont du lundi au vendredi de 08:00 à 17:59. Tous les
créneaux indisponibles y sont inclus.

**Sortie**

Une ligne au format `d hh:mm-hh:mm` correspondant à l'horaire de réunion trouvé.
Il doit être:

- en intersection avec aucun créneau d'indisponibilité d'un collègue
- pendant les horaires de travail, sans dépasser
- d'une durée exacte de 60 minutes, début et fin incluses (eg. 14:00-14:59)
- la première solution possible s'il en existe plusieurs

**Exemple**

Pour l'entrée :

```
1 08:45-12:59
3 11:09-11:28
5 09:26-09:56
5 16:15-16:34
3 08:40-10:12
```

La solution est

```
1 13:00-13:59
```

Le premier jour il n'y a qu'un seul créneau indisponible de 08:45 à 12:59. En
faisant par exemple commencer la réunion à 13:00 et en la terminant à 13:59, elle
n'aura aucune intersection avec les créneaux indisponibles.

### Environnement

Vous travaillez avec Node.js v12.18.4

### Tests

Créez un test avec une librairie adéquate en prenant les _inputX.txt_ en entrée
pour vérifier que le résultat de votre fonction correspond aux sorties attendues
dans les _outputX.txt_ dans le dossier data.

### Déploiement

Envoyez votre solution sur un repo git accessible sur Github ou Gitlab puis
envoyez nous le lien de ce repo, avec l'accès si nécessaire.

### Bonus

1. Vous préférez avoir un code standardisé ? Nous aussi. Ajoutez votre
   config préférée.

2. Créez une config CI pour exécuter la commande test sur votre repo à chaque
   modification.

---

## Code review (~20m)

Passez en revue le code ci dessous

Si vous pensez que des modifications sont utiles

1. écrivez un commentaire comme pendant une review de pull request
2. puis écrivez le code comme vous l'imagineriez

**NB**

- Faites ces reviews comme bon vous semble, tout n'est pas à commenter
- Ne commentez pas le style (indentation, trailing comma, etc.)
- Admettez que le code fonctionne
- Ces bouts de codes fictifs n'ont rien à voir les uns avec les autres
- Ne vous attardez pas sur des détails, comme le naming, qui ne nous intéressent pas ici

1.

```js
const data = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
];

const values = data.reduce((values, { value }) => {
  values.push(value);
  return values;
}, []);

// alternative solution more readable i think

const values = data.map((el) => el.value);
```

2.

```js
async function getIndexes() {
  return await fetch('https://api.coingecko.com/api/v3/indexes').then((res) =>
    res.json()
  );
}

async function analyzeIndexes() {
  const indexes = await getIndexes().catch((_) => {
    throw new Error('Unable to fetch indexes');
  });
  return indexes;
}

// alternative solution more readable i think

async function getIndexes() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/indexes');
    const data = await res.json();
    return data;
  } catch (err) {}
}

async function analyzeIndexes() {
  const indexes = await getIndexes().catch((_) => {
    throw new Error('Unable to fetch indexes');
  });
  return indexes;
}
```

3.

```js
let state;
const user = getUser();
if (user) {
  const project = getProject(user.id);
  state = {
    user,
    project,
  };
} else {
  state = {
    user: null,
    project: null,
  };
}
ctx.body = state;

// setting init state

const state = {
  user: null,
  project: null,
};
const user = getUser();
if (user) {
  const project = getProject(user.id);
  state = {
    user,
    project,
  };
}
ctx.body = state;
```

4.

```js
function getQueryProvider() {
  const url = window.location.href;
  //maybe no match, il will an error
  const [_, provider] = url.match(/provider=([^&]*)/);
  if (provider) {
    return provider;
  }
  // i don't no if it's necessary
  return;
}

const getQueryProvider = () => {
  const url = window.location.href;
  //check if match
  const result = url.match(/localhost([^&]*)/);
  if (result) {
    const [_, provider] = result;
    return provider;
  }
};
```

5.

```js
function getParagraphTexts() {
  const texts = [];
  document.querySelectorAll('p').forEach((p) => {
    texts.push(p);
  });
  return texts;
}

// es6 method
const getParagraphTexts = () => [...document.querySelectorAll('p')];
```

6.

```js
function Employee({ id }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployee(id)
      .then((employee) => {
        setEmployee(employee);
        setLoading(false);
      })
      .catch((_) => {
        setError('Unable to fetch employee');
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }
  // destructuring
  // const {firstName, lastName ...} = employee
  return (
    <Table>
      <Row>
        <Cell>{employee.firstName}</Cell>
        <Cell>{employee.lastName}</Cell>
        <Cell>{employee.position}</Cell>
        <Cell>{employee.project}</Cell>
        <Cell>{employee.salary}</Cell>
        <Cell>{employee.yearHired}</Cell>
        <Cell>{employee.wololo}</Cell>
      </Row>
    </Table>
  );
}
```

7.

```js
async function getFilledIndexes() {
  try {
    const filledIndexes = [];
    const indexes = await getIndexes();
    const status = await getStatus();
    const usersId = await getUsersId();

    for (let index of indexes) {
      if (index.status === status.filled && usersId.includes(index.userId)) {
        filledIndexes.push(index);
      }
    }
    return filledIndexes;
  } catch (_) {
    throw new Error('Unable to get indexes');
  }
}

// we can do that with filter method

async function getFilledIndexes() {
  try {
    const indexes = await getIndexes();
    const status = await getStatus();
    const usersId = await getUsersId();

    return indexes.filter(
      (indexEl, idx) =>
        indexEl.status === status.filled && usersId.includes(indexEl.userId)
    );
  } catch (_) {
    throw new Error('Unable to get indexes');
  }
}
```

8.

```js
function getUserSettings(user) {
  if (user) {
    const project = getProject(user.id);
    if (project) {
      const settings = getSettings(project.id);
      if (settings) {
        return settings;
      }
    }
  }
  return {};
}

//

const getUserSettings=(user) => {
   if(!user) throw new Error('No user');
   const project = getProject(user.id)
   if(!project) throw new Error('No project')
   const settings = getSettings(project.id)
   if(!settings) throw new Error('No settings)

}
```
# weglot
