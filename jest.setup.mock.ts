import {MockRepositories} from "./test/mock/MockRepositories";
import {setRepositories} from "./test/RepositoriesSetup";

beforeAll(async () => {
    setRepositories(new MockRepositories());
});
