import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'image'
const to = 'banner'

export default defineMigration({
  title: 'alt-in-event-type',
  // documentTypes: ["event"],
  filter: `_type == 'event' && defined(image) && !defined(banner)`,

  migrate: {
    document(doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
