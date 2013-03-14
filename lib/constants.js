module.exports = {
    configFilename: 'package.json',
    defaultConfig: {
        "name":      "",
        "version":   "0.0.0",
        "boiler": {
            "output_file_dir":  ".",
            "file_filter":      ["!.DS_Store", "!thumbs.db"],
            "dir_filter":       ["!.svn", "!.git", "!.sass-cache"],
            "file_mapping":     [],
            "var_mapping":      {}
        }
    }
};