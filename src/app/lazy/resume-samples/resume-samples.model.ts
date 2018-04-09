
export class IResumeItem {
    image: string;
    title: string;
    pdf: string;
}

export interface IResumeRequest {
    url: string;
}

export const SENIOR_SAMPLES: IResumeItem[] = [
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Chief-Financial-Officer-Senior-Finance-Executive-Resume-Sample.png',
        title: 'Chief Financial Officer Resume Sample – Senior Finance Executive',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/Chief-Financial-Officer-Senior-Finance-Executive-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Global-Operations-Director-COO-Chief-Operations-Officer-Resume-Sample.png',
        title: 'Global Operations Director (COO) – Chief Operations Officer Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Global-Operations-Director-COO-Chief-Operations-Officer-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Chief-Medical-Officer-Resume-Sample-Medical-Affairs.png',
        title: 'Chief Medical Officer Resume Sample – Medical Affairs',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Chief-Medical-Officer-Resume-Sample-Medical-Affairs.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Chief-Marketing-Officer-Resume-Sample.png',
        title: 'Chief Marketing Officer Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2014/06/Chief-Marketing-Officer-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/CFO-Manufacturing-Resume-Sample.png',
        title: 'CFO Resume Sample – Manufacturing',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2016/04/CFO-Manufacturing-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/2016/06/Human-Resources-Executive-Resume-Sample.jpg',
        title: 'Human Resources Executive (Director/VP) Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Human-Resources-Executive-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/CIO-Executive-Resume-Sample-Chief-Information-Officer-Resume.png',
        title: 'CIO Executive Resume Sample – Chief Information Officer Resume',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/CIO-Executive-Resume-Sample-Chief-Information-Officer-Resume.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Chief-Financial-Officer-Senior-Finance-Executive-Resume-Sample.png',
        title: 'Chief Financial Officer (CFO) Resume Sample – VP Finance Executive Resume',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/Chief-Financial-Officer-Senior-Finance-Executive-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Financial-Director-Private-Equity-Executive-Resume-Sample.png',
        title: 'Financial Director – Private Equity Executive Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Financial-Director-Private-Equity-Executive-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/EVP-Marketing-Executive-Resume-Sample.png',
        title: 'EVP Marketing Executive Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2014/06/EVP-Marketing-Executive-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Healthcare-Executive-Resume-Sample-1.png',
        title: 'Healthcare Executive Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Healthcare-Executive-Resume-Sample-1.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Digital-Media-Email-Marketing-Manager-Resume-Sample.png',
        title: 'Digital Media – Email Marketing Manager Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Digital-Media-Email-Marketing-Manager-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Sales-and-Marketing-Manager-Resume-Sample.png',
        title: 'Sales and Marketing Manager Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Sales-and-Marketing-Manager-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Attorney-Legal-Law-Resume-Sample.png',
        title: 'Attorney-Legal-Law Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Attorney-Legal-Law-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Clinical-Nurse-Manager-Resume-Sampl.png',
        title: 'Clinical Nurse Manager – Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Clinical-Nurse-Manager-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Engineering-Resume-Sample.png',
        title: 'Engineering Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Engineering-Resume-Sample.pdf'
    },
    {
        image: 'http://chameleonresumes.com/wp-content/uploads/Sports-Marketing-Sales-Resume-Sample.png',
        title: 'Sports Marketing Sales Resume Sample',
        pdf: 'http://chameleonresumes.com/wp-content/uploads/2011/11/Sports-Marketing-Sales-Resume-Sample.pdf'
    }
];

export interface IResumeSamples {
    senior: IResumeContainer;
    entry: IResumeContainer;
}

export interface IResumeContainer {
    resumes: Array<IResume>
    page: IResumePage
}

export interface IResumePage {
    url: string;
    title: string;
    content: string;
    get_started: string;
    service_button: string;
}

export interface IResume {
    id: number;
    title: string;
    category: string;
    status: string;
    image_name: string;
    pdf_name: string;
    created_at: string;
    updated_at:string;
}




























