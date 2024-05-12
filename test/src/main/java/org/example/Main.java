package org.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

public class Main {
    public static void main(String[] args) {
        int []tab = new int[5];
        tab[0] = 1;
        tab[1] = 2;
        tab[2] = 3;

        List<Integer> list = new ArrayList<>();

        Vector<Integer> vector = new Vector<>();

        for(int i = 0; i<41;i++)
            vector.add(i);

        System.out.println(tab.length);
        System.out.printf("%.2f", 2.3333);

        System.out.println(vector.capacity());
    }
}