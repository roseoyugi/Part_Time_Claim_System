export type UserType = {
    id:string
    name:string
    email:string
    role:string
    account_number:string
    national_id:string
    job_id:string
}

export type ClaimType = {
    id:string
    hours:number
    date:string
    status:string
    user_id:string
    job_id:string
    file_url:string
}

export type ClaimantType = {
    name:string
    email:string
    job_id:string

}

export type DepartmentType = {
    id:string
    name:string
    manager_id:string
}

export type JobType = {
    id:string
    name:string
    pay_rate:string
    department_id:string
}

