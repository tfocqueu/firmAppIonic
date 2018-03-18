export class Enterprise {

    constructor(siren, l1declaree, nic, l1_normalisee, l2_normalisee , l3_normalisee, l4_normalisee) {
        this.siren = siren ;
        this.name = l1declaree;
        this.internNum = nic;
        this.firstAddress = l1_normalisee;
        this.secondAddress = l2_normalisee;
        this.thirdAddress = l3_normalisee;
        this.fourthAddress = l4_normalisee;
    }

    siren: number;
    name: string;
    internNum: number;
    firstAddress: string;
    secondAddress: string;
    thirdAddress: string;
    fourthAddress: string;
}
