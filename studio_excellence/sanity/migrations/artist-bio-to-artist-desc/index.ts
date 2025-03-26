import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'bio'
const to = 'description'

export default defineMigration({
  title: 'artist-bio-to-artist-desc',
  // documentTypes: ["artist"],
  filter: `_type == 'artist' && defined(bio) && !defined(description)`,
  migrate: {
    document(doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
