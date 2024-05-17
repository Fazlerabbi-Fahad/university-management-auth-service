import { Model } from 'mongoose'

export type Months =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type Titles = 'Autumn' | 'Summer' | 'Fall'
export type Codes = '01' | '02' | '03'

export type IAcademicSemester = {
  title: Titles
  year: string
  code: Codes
  startMonth: Months
  endMonth: Months
}

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>

export type IAcademicSemesterFilters = {
  searchTerm?: string
}
