import {DocumentType} from "@/app/document/_types.tsx";

let athletes = [
    {
        id: 1,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 2,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 3,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 4,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 5,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 6,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 7,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 8,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 9,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 10,
        fullName: "Иванов Иван Иванович",
        sportName: "Легкая атлетика",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 11,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 12,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 13,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: true,
        isDopingCheckPassed: true
    },
    {
        id: 14,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 15,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 16,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: false
    },
    {
        id: 17,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: true
    },
    {
        id: 18,
        fullName: "Иванов Иван Иванович",
        sportName: "Футбол",
        municipality: 'г. Екатеринбург',
        organization: 'УГМК',
        isSportsCategoryGranted: false,
        isDopingCheckPassed: false
    }
].sort((a, b) => {
    // 1. Sort by sport name
    if (a.sportName < b.sportName) return -1;
    if (a.sportName > b.sportName) return 1;

    // 2. If same sport, sort by full name
    if (a.fullName < b.fullName) return -1;
    if (a.fullName > b.fullName) return 1;

    // 3. If same name, sort by sports category (false first)
    if (a.isSportsCategoryGranted !== b.isSportsCategoryGranted) {
        return a.isSportsCategoryGranted ? -1 : 1;
    }

    // 4. If same category, sort by doping test (false first)
    if (a.isDopingCheckPassed !== b.isDopingCheckPassed) {
        return a.isDopingCheckPassed ? -1 : 1;
    }

    return 0;
});

export async function getDocument(id: number): Promise<DocumentType> {
    console.log(id)

    return (
        {
            id: id,
            title: 'Документ от 26.05.2025',
            sportsRankId: 1,
            athletes: athletes
        }
    )
}
