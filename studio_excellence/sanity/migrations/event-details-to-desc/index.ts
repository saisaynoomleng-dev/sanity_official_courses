import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'details'
const to = 'description'

export default defineMigration({
  title: 'event-details-to-desc',
  // documentTypes: ["event"],
  filter: `_type == 'event' && defined(details) && !defined(description)`,
  migrate: {
    document(doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
