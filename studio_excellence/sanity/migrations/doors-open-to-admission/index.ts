import {defineMigration, at, setIfMissing, unset} from 'sanity/migrate'

const from = 'doorsOpen'
const to = 'admission'

export default defineMigration({
  title: 'doors-open-to-admission',
  // documentTypes: ["event"],
  filter: `_type == 'event' && defined(doorsOpen) && !defined(admission)`,
  migrate: {
    document(doc, context) {
      return [
        at(to, setIfMissing(doc[from])),
        at(from, unset())
      ]
    }
  }
})
