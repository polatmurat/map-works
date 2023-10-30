class Place {
    constructor(name, category, city, province, coordinates, description, authorID) {
        this.name = name;
        this.category = category;
        this.city = city;
        this.province = province;
        this.coordinates = coordinates;
        this.description = description;
        this.authorID = authorID;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = Place;