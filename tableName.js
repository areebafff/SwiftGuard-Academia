function simpleSqlName(name) {
    if (name.length > 30) {
        throw new Error('Not simple SQL Name');
    }

    /**
     * Fairly generic, but effective. Would need to be adjusted to accommodate quoted identifiers,
     * schemas, etc.
     */
    if (!/^[a-zA-Z0-9#_$]+$/.test(name)) {
        throw new Error('Not simple SQL Name');
    }

    return name;
}

module.exports.simpleSqlName = simpleSqlName;