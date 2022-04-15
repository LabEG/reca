
export class DiConfig {
    public resolver: string = "insert di resolver here";
}

export class Config {
    public di: DiConfig = new DiConfig();
}

export const config = new Config();
