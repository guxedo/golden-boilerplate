export class Note {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly content: string,
        public readonly userId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    static restore(data: any): Note {
        return new Note(
            data.id,
            data.title,
            data.content,
            data.userId,
            data.createdAt,
            data.updatedAt,
        );
    }
}
