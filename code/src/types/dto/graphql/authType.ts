import { LanguageSettingEnum, UserTypeEnum } from "../../enums";

export type LoginParams = {
    email: string;
    password: string;
}

export type LoginResponse = {
    AccessToken: string;
    UserID: string;
    LoginEmail: string;
    UserType: UserTypeEnum;
    VirtualCoach: boolean;
    TotalUnread: string;
    ResearcherEmail: string | null;
    Language: LanguageSettingEnum;
    CalendarTypeAsScore: boolean;
}

export type ResetPasswordParams = {
    email: string;
}

export type ResetPasswordResponse = boolean;