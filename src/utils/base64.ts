

export const encodeBase64 = (data: any): string => Buffer.from(JSON.stringify(data)).toString('base64');
export const decodeBase64 = <T>(data: string): T => {
    if (typeof data === 'string') {
        return Buffer.from(data, 'base64').toString('utf-8') as any;
    }

    return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
};