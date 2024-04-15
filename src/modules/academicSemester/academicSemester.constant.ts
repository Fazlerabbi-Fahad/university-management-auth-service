import { Codes, Months, Titles } from './academicSemester.interface'

export const academicSemesterMonths: Months[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: Titles[] = ['Autumn', 'Summer', 'Fall']
export const academicSemesterCodes: Codes[] = ['01', '02', '03']

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterSearchableFields = ['title', 'code', 'year']

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
