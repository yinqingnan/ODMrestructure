import {HttpService} from './service/http';
    
declare module 'vue/types/vue' {
    interface Vue {
        $httpService: HttpService;
    }
}